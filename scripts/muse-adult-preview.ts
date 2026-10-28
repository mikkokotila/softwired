import { createServer } from "node:http";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { parse as dotenvParse } from "dotenv";
import { lessons } from "../src/content";
import {
  adultReviewRequestSchema,
  createMuseContributorAdultReviewer,
  MUSE_CONTRIBUTOR_MODEL,
} from "../server/muse-contributor-review";

const port = Number(process.env.MUSE_REVIEW_PORT ?? 4397);
if (!Number.isInteger(port) || port < 1024 || port > 65535)
  throw new Error("Invalid private review port");
if (process.env.MUSE_ADULT_REVIEW !== "YES")
  throw new Error(
    "Private adult-only reviewer: confirm adult developer use via MUSE_ADULT_REVIEW=YES",
  );
const credentials = dotenvParse(readFileSync(path.join(os.homedir(), ".env")));
const key = process.env.MUSE_API_KEY ?? credentials.muse_api_key;
if (!key) throw new Error("Muse credential unavailable");
const review = createMuseContributorAdultReviewer(key);
const csrf = randomBytes(32).toString("hex");
const template = readFileSync(
  new URL("../private/muse-review.html", import.meta.url),
  "utf8",
);
const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
const options = lessons
  .map(
    (l) =>
      '<option value="' +
      esc(l.id) +
      '">' +
      esc(l.id + " · " + l.title) +
      "</option>",
  )
  .join("\n");
const html = template.replace("__LESSONS__", options).replace("__CSRF__", csrf);
const origin = "http://127.0.0.1:" + port;
let active = false;
let used = 0;
let currentMinute = 0;
const headers = {
  "Cache-Control": "no-store, private",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "X-Frame-Options": "DENY",
  "Content-Security-Policy":
    "default-src 'none'; connect-src 'self'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'",
};
const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", origin);
  const fail = (code: number, message: string) => {
    res.writeHead(code, {
      ...headers,
      "Content-Type": "application/json; charset=utf-8",
    });
    res.end(JSON.stringify({ error: message }));
  };
  if (url.pathname === "/" && req.method === "GET") {
    res.writeHead(200, {
      ...headers,
      "Content-Type": "text/html; charset=utf-8",
    });
    res.end(html);
    return;
  }
  if (url.pathname !== "/api/review" || req.method !== "POST") {
    fail(404, "Not found");
    return;
  }
  if (req.headers.origin !== origin) {
    fail(403, "Cross-origin request rejected");
    return;
  }
  const passedCsrf = Buffer.from(
    String(req.headers["x-review-csrf"] ?? ""),
    "utf8",
  );
  const expectedCsrf = Buffer.from(csrf, "utf8");
  if (
    passedCsrf.length !== expectedCsrf.length ||
    !timingSafeEqual(passedCsrf, expectedCsrf)
  ) {
    fail(403, "Session expired");
    return;
  }
  const minute = Math.floor(Date.now() / 60_000);
  if (minute !== currentMinute) {
    currentMinute = minute;
    used = 0;
  }
  if (active || used >= 6) {
    fail(429, "Adult review request limit reached");
    return;
  }
  let raw = "";
  try {
    for await (const chunk of req) {
      raw += String(chunk);
      if (raw.length > 14_000) throw new Error("TOO_LARGE");
    }
  } catch {
    fail(413, "Request too large");
    return;
  }
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    fail(400, "Invalid JSON");
    return;
  }
  const parsed = adultReviewRequestSchema.safeParse(data);
  if (!parsed.success) {
    fail(
      400,
      "Only confirmed adult, fictional evaluation requests are allowed",
    );
    return;
  }
  used++;
  active = true;
  const abort = new AbortController();
  const timeout = setTimeout(() => abort.abort(), 55_000);
  try {
    const result = await review(parsed.data, abort.signal);
    res.writeHead(200, {
      ...headers,
      "Content-Type": "application/json; charset=utf-8",
    });
    res.end(JSON.stringify(result));
  } catch (e) {
    const error = e as { message?: string; status?: number };
    fail(
      error.message === "PERSONAL_DATA_NOT_ALLOWED" ? 400 : 502,
      error.message === "PERSONAL_DATA_NOT_ALLOWED"
        ? "Identifying information is not permitted in Contributor mode."
        : "Exact Muse Contributor request failed; no other model was used.",
    );
  } finally {
    clearTimeout(timeout);
    active = false;
  }
});
server.listen(port, "127.0.0.1", () => {
  console.log("Adult-only private Muse reviewer: " + origin);
  console.log(
    "Pinned model: " +
      MUSE_CONTRIBUTOR_MODEL +
      "; no fallback; credentials stay server-side",
  );
});
