import express, { type ErrorRequestHandler } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import path from "node:path";
import { z } from "zod";
import {
  tutorRequestSchema,
  createOpenAITutor,
  type TutorRequest,
  type TutorReply,
  tutorReplySchema,
  TutorSafetyError,
} from "./tutor";
import { lessonById } from "../src/content";
export interface AppConfig {
  apiKey?: string;
  model: string;
  appOrigin: string;
  production?: boolean;
  publicBind?: boolean;
  accessToken?: string;
  cookieSecret?: string;
  editorialNote?: string;
  dailyLimit?: number;
  timeoutMs?: number;
  rateMax?: number;
}
export type TutorProvider = (
  request: TutorRequest,
  signal: AbortSignal,
) => Promise<TutorReply>;
function equal(a: string, b: string) {
  return timingSafeEqual(
    createHash("sha256").update(a).digest(),
    createHash("sha256").update(b).digest(),
  );
}
export function createApp(config: AppConfig, injectedProvider?: TutorProvider) {
  const app = express();
  app.disable("x-powered-by");
  const origin = new URL(config.appOrigin).origin;
  const isLocal = ["localhost", "127.0.0.1", "[::1]"].includes(
    new URL(origin).hostname,
  );
  if (
    ((config.production && !isLocal) || config.publicBind) &&
    (!config.accessToken || config.accessToken.length < 24)
  )
    throw new Error(
      "Public production deployment requires APP_ACCESS_TOKEN of at least 24 characters.",
    );
  const secret = config.cookieSecret?.trim() || randomBytes(32).toString("hex");
  const cookieOptions = {
    httpOnly: true,
    secure: origin.startsWith("https:"),
    sameSite: "strict" as const,
    signed: true,
    path: "/api",
    maxAge: 12 * 60 * 60_000,
  };
  app.use(
    helmet({
      contentSecurityPolicy: config.production
        ? {
            directives: {
              defaultSrc: ["'self'"],
              scriptSrc: ["'self'"],
              styleSrc: ["'self'", "'unsafe-inline'"],
              imgSrc: ["'self'", "data:", "blob:"],
              fontSrc: ["'self'"],
              connectSrc: ["'self'"],
              objectSrc: ["'none'"],
              baseUri: ["'self'"],
              frameAncestors: ["'none'"],
              upgradeInsecureRequests: null,
            },
          }
        : false,
    }),
  );
  app.use("/api", (_req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
  });
  app.use("/api", (req, res, next) => {
    if (req.get("Origin") && req.get("Origin") !== origin) {
      res
        .status(403)
        .json({ error: "Pyyntö ei tule sovelluksen omasta osoitteesta." });
      return;
    }
    if (req.get("Sec-Fetch-Site") === "cross-site") {
      res.status(403).json({ error: "Ristiin tuleva pyyntö estettiin." });
      return;
    }
    next();
  });
  app.use(express.json({ limit: "24kb", strict: true }));
  app.use(cookieParser(secret));
  // A successful provider response verifies the configured model for this process.
  // Never confuse "key present" with "connection verified".
  let verifiedOnce = false;
  const authorized = (req: express.Request) =>
    !config.accessToken ||
    req.signedCookies.kipina_access ===
      createHash("sha256").update(config.accessToken).digest("hex");
  app.get("/api/status", (req, res) => {
    const csrf =
      typeof req.signedCookies.kipina_session === "string"
        ? req.signedCookies.kipina_session
        : randomBytes(24).toString("hex");
    res.cookie("kipina_session", csrf, cookieOptions);
    res.json({
      configured: !!config.apiKey,
      model: config.model,
      provider: "OpenAI API",
      contributorMode: false,
      verified: verifiedOnce,
      accessRequired: !authorized(req),
      csrf,
      message: !config.apiKey
        ? "AI odottaa avainta"
        : verifiedOnce
          ? "AI-yhteys vahvistettu onnistuneella pyynnöllä"
          : "Avain määritetty · yhteys varmistuu ensimmäisellä pyynnöllä",
      paidNotice:
        "OpenAI API on maksullinen. API-syötteitä ei käytetä mallien kouluttamiseen oletusarvoisesti. Sisältöä voi säilyä väärinkäytön valvontalokeissa. Hinta riippuu tokeneista.",
    });
  });
  const csrfCheck: express.RequestHandler = (req, res, next) => {
    const session = req.signedCookies.kipina_session;
    if (
      typeof session !== "string" ||
      !equal(req.get("X-CSRF-Token") ?? "", session)
    ) {
      res.status(403).json({
        error: "Istunto vanheni. Päivitä AI-yhteyden tila ja yritä uudelleen.",
      });
      return;
    }
    next();
  };
  const authLimit = rateLimit({
    windowMs: 15 * 60_000,
    limit: 8,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { error: "Liian monta avausyritystä. Odota 15 minuuttia." },
  });
  app.post("/api/unlock", authLimit, csrfCheck, (req, res) => {
    const body = z
      .object({ token: z.string().min(1).max(256) })
      .strict()
      .safeParse(req.body);
    if (!body.success) {
      res.status(400).json({ error: "Anna palvelimen käyttöavain." });
      return;
    }
    if (config.accessToken && !equal(body.data.token, config.accessToken)) {
      res.status(401).json({ error: "Käyttöavain on väärä." });
      return;
    }
    if (config.accessToken)
      res.cookie(
        "kipina_access",
        createHash("sha256").update(config.accessToken).digest("hex"),
        cookieOptions,
      );
    res.json({ ok: true });
  });
  const tutorLimit = rateLimit({
    windowMs: 60_000,
    limit: config.rateMax ?? 8,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
      error: "Pyyntöjä on liikaa. Odota minuutti ja yritä uudelleen.",
    },
  });
  const provider =
    injectedProvider ??
    (config.apiKey
      ? createOpenAITutor(config.apiKey, config.model, config.editorialNote)
      : undefined);
  let day = new Date().toISOString().slice(0, 10);
  let calls = 0;
  let concurrent = 0;
  app.post("/api/tutor", tutorLimit, csrfCheck, async (req, res) => {
    if (!authorized(req)) {
      res
        .status(401)
        .json({ error: "Avaa AI-yhteys asetusten käyttöavaimella." });
      return;
    }
    const parsed = tutorRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        error:
          "Tarkista oppitunti, suostumus ja viestin pituus. Arviointi tarvitsee oman vastauksen (vähintään 20 merkkiä).",
      });
      return;
    }
    if (!provider) {
      res.status(503).json({
        error:
          "AI odottaa avainta. Lisää OPENAI_API_KEY palvelimen .env-tiedostoon ja käynnistä palvelin uudelleen.",
      });
      return;
    }
    const today = new Date().toISOString().slice(0, 10);
    if (today !== day) {
      day = today;
      calls = 0;
    }
    if (calls >= (config.dailyLimit ?? 100)) {
      res.status(429).json({
        error:
          "Palvelimen päivän AI-pyyntöraja täyttyi. Kokeile huomenna tai jatka offline-tehtävillä.",
      });
      return;
    }
    if (concurrent >= 2) {
      res
        .status(429)
        .json({ error: "AI käsittelee jo kahta pyyntöä. Odota hetki." });
      return;
    }
    calls++;
    concurrent++;
    const controller = new AbortController();
    const onClose = () => {
      if (!res.writableEnded) controller.abort();
    };
    res.on("close", onClose);
    let timeout: ReturnType<typeof setTimeout> | undefined;
    try {
      const result = await Promise.race([
        provider(parsed.data, controller.signal),
        new Promise<never>((_, reject) => {
          timeout = setTimeout(() => {
            controller.abort();
            reject(new Error("AI_TIMEOUT"));
          }, config.timeoutMs ?? 50_000);
        }),
      ]);
      const output = tutorReplySchema.parse(result);
      if (
        parsed.data.mode === "grade"
          ? output.score === null
          : output.score !== null
      )
        throw new Error("AI_INVALID_SCORE");
      verifiedOnce = true;
      const lesson = lessonById[parsed.data.lessonId];
      if (!res.destroyed)
        res.json({
          ...output,
          model: config.model,
          source: {
            title: lesson.title,
            book: lesson.source.book,
            pdf: lesson.source.pdf,
          },
        });
    } catch (error) {
      if (res.destroyed) return;
      const status =
        typeof error === "object" && error !== null && "status" in error
          ? Number(error.status)
          : 0;
      const message = error instanceof Error ? error.message : "";
      if (error instanceof TutorSafetyError)
        res.status(422).json({
          error: error.higherRisk
            ? "Tämä voi olla vakava tai henkilökohtainen asia. Kerro heti turvalliselle aikuiselle tai kouluterveydenhoitajalle. Jos olet välittömässä vaarassa, soita 112. Voit jatkaa oppituntia ilman AI:ta."
            : "AI ei voi käsitellä tätä viestiä turvallisesti. Jatka oppitunnin harjoituksia ilman AI:ta tai käytä kuvitteellista, henkilökohtaisia tietoja välttävää esimerkkiä.",
        });
      else if (controller.signal.aborted || message === "AI_TIMEOUT")
        res.status(504).json({
          error:
            "AI-pyyntö aikakatkaistiin. Yritä lyhyemmällä viestillä tai myöhemmin.",
        });
      else if (status === 401 || status === 403)
        res.status(502).json({
          error:
            "OpenAI API ei hyväksynyt avainta tai mallin käyttöoikeutta. Palvelimen ylläpitäjän on tarkistettava asetukset.",
        });
      else if (status === 404)
        res.status(502).json({
          error: `Malli ${config.model} ei ole käytettävissä tällä tilillä. Ylläpitäjä voi valita mallin OPENAI_MODEL-asetuksella. Mallia ei vaihdeta automaattisesti.`,
        });
      else if (status === 429)
        res.status(429).json({
          error:
            "OpenAI API -tilin raja tai saldo esti pyynnön. Tarkista laskutus ja rajat.",
        });
      else
        res.status(502).json({
          error:
            "AI ei palauttanut kelvollista vastausta. Vastausta ei pisteytetty; yritä uudelleen.",
        });
    } finally {
      if (timeout) clearTimeout(timeout);
      concurrent--;
      res.off("close", onClose);
    }
  });
  app.use("/api", (_req, res) => {
    res.status(404).json({ error: "Rajapintaa ei löytynyt." });
  });
  if (config.production) {
    const dist = path.resolve("dist");
    app.use(
      express.static(dist, {
        index: false,
        setHeaders: (res, file) => {
          res.setHeader(
            "Cache-Control",
            /\/assets\//.test(file)
              ? "public, max-age=31536000, immutable"
              : "no-cache",
          );
        },
      }),
    );
    app.get("/{*path}", (_req, res) => {
      res.set("Cache-Control", "no-cache");
      res.sendFile(path.join(dist, "index.html"));
    });
  }
  const handleError: ErrorRequestHandler = (
    err: { type?: string },
    _req,
    res,
    _next,
  ) => {
    res.status(err.type === "entity.too.large" ? 413 : 400).json({
      error:
        err.type === "entity.too.large"
          ? "Pyyntö on liian suuri."
          : "Pyyntö ei ole kelvollista JSON-muotoa.",
    });
  };
  app.use(handleError);
  return app;
}
