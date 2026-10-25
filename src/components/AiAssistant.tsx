import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Bot,
  LoaderCircle,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  askTutor,
  getAIStatus,
  type AIResponse,
  type AIStatus,
} from "../lib/api";
import { useOnline } from "../lib/hooks";
import { AI_CONSENT_PROVIDER } from "../lib/storage";
import { useStudy } from "../lib/store";
import { Notice } from "./ui";
type Mode = "explain" | "hint" | "grade" | "dialogue";
const modes: { id: Mode; label: string }[] = [
  { id: "explain", label: "Selitä" },
  { id: "hint", label: "Vihjaa" },
  { id: "dialogue", label: "Keskustele" },
  { id: "grade", label: "Arvioi" },
];
export function AiAssistant({
  lessonId,
  task = "application",
  answer = "",
  initialMode = "explain",
  onGraded,
  onHelp,
}: {
  lessonId: string;
  task?: "recall" | "application" | "exam";
  answer?: string;
  initialMode?: Mode;
  onGraded?: (response: AIResponse) => void;
  onHelp?: () => void;
}) {
  const { state, setState } = useStudy();
  const online = useOnline();
  const hasProviderConsent =
    state.consent && state.consentProvider === AI_CONSENT_PROVIDER;
  const [status, setStatus] = useState<AIStatus | null>(null);
  const [statusError, setStatusError] = useState("");
  const [mode, setMode] = useState<Mode>(initialMode);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [replies, setReplies] = useState<
    { question: string; response: AIResponse }[]
  >([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const abort = useRef<AbortController | null>(null);
  const refresh = () => {
    setStatusError("");
    getAIStatus()
      .then(setStatus)
      .catch(() => {
        setStatus(null);
        setStatusError(
          "AI-palvelin ei vastaa. Käynnistä palvelin tai tarkista verkkoyhteys.",
        );
      });
  };
  useEffect(() => {
    const c = new AbortController();
    getAIStatus(c.signal)
      .then(setStatus)
      .catch(() => {
        if (!c.signal.aborted)
          setStatusError(
            "AI-palvelin ei vastaa. Tarkista yhteys ja palvelimen käynnistys.",
          );
      });
    return () => {
      c.abort();
      abort.current?.abort();
    };
  }, []);
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (
      !status?.configured ||
      !hasProviderConsent ||
      busy ||
      !online ||
      status.accessRequired
    )
      return;
    const sent = mode === "grade" ? answer : message;
    if (!sent.trim() || (mode === "grade" && sent.trim().length < 20)) {
      setError(
        "Kirjoita ensin oma vastaus (arviointiin vähintään 20 merkkiä).",
      );
      return;
    }
    setBusy(true);
    setError("");
    const controller = new AbortController();
    abort.current = controller;
    const timeout = setTimeout(() => controller.abort(), 55_000);
    try {
      const result = await askTutor(
        {
          lessonId,
          mode,
          message: sent.trim(),
          consent: true,
          task,
          history: mode === "dialogue" ? history.slice(-8) : [],
        },
        status.csrf,
        controller.signal,
      );
      setReplies((old) => [
        ...old.slice(-7),
        { question: sent, response: result },
      ]);
      setHistory((old) => [
        ...old,
        { role: "user", content: sent.slice(0, 1500) },
        { role: "assistant", content: result.reply.slice(0, 1500) },
      ]);
      setStatus((old) => old && { ...old, verified: true });
      setMessage("");
      if (mode === "grade") onGraded?.(result);
      else onHelp?.();
    } catch (err) {
      setError(
        controller.signal.aborted
          ? "Pyyntö keskeytettiin tai aikakatkaistiin. Voit yrittää uudelleen."
          : err instanceof Error
            ? err.message
            : "AI-pyyntö epäonnistui.",
      );
    } finally {
      clearTimeout(timeout);
      setBusy(false);
    }
  }
  const label = !online
    ? "AI tarvitsee verkkoyhteyden"
    : statusError
      ? "AI-palvelin ei vastaa"
      : !status
        ? "Tarkistetaan yhteyttä…"
        : !status.configured
          ? "AI odottaa avainta"
          : status.accessRequired
            ? "AI odottaa käyttöavainta"
            : status.verified
              ? "AI-yhteys varmennettu"
              : "Avain määritetty · yhteys testaamatta";
  return (
    <section className="ai-assistant" aria-label="AI-opettaja">
      <div className="ai-title">
        <span className="icon-square lilac">
          <Sparkles size={22} />
        </span>
        <div>
          <h2>Oivallus alkaa kysymyksestä.</h2>
          <span className="small muted">
            {status?.model ?? "gpt-6-astra"} · {label}
          </span>
        </div>
        <button
          className="icon-button"
          onClick={refresh}
          aria-label="Päivitä AI-yhteyden tila"
        >
          <RefreshCw size={17} />
        </button>
      </div>
      {!online && (
        <Notice>
          Oppitunnit ja oma arviointi toimivat offline-tilassa. AI tarvitsee
          verkon.
        </Notice>
      )}
      {statusError && <Notice kind="error">{statusError}</Notice>}
      {status && !status.configured && (
        <Notice>
          AI odottaa avainta. Ylläpitäjä lisää <code>OPENAI_API_KEY</code>
          -avaimen palvelimen .env-tiedostoon. Opiskelu ja omat arviot toimivat
          sillä välin. <a href="#/settings">Yhteysasetukset →</a>
        </Notice>
      )}
      {status?.accessRequired && (
        <Notice>
          Avaa AI:n käyttöoikeus <a href="#/settings">asetuksissa</a>.
        </Notice>
      )}
      {!hasProviderConsent && (
        <div className="consent-box">
          <ShieldCheck size={22} />
          <div>
            <strong>Sinä päätät, mitä lähetät.</strong>
            <p>
              AI-pyynnössä kysymyksesi, vastauksesi ja valitun oppitunnin
              sisältö lähetetään OpenAI API -palveluun. Keskustelutilassa
              lähetetään myös viimeiset viestit. API-syötteitä ei käytetä
              mallien kouluttamiseen oletusarvoisesti, mutta niitä voi säilyä
              väärinkäytön valvontaan liittyvissä lokeissa enintään 30 päivää,
              ellei pidempi säilytys ole tarpeen lain tai turvallisuuden vuoksi.
              Älä lähetä nimiä, omia tai muiden terveystietoja, osoitteita tai
              yksityisiä perheasioita. Käytä kuvitteellisia tilanteita.
              Keskustele AI:n käytöstä huoltajan kanssa. API on maksullinen;
              suostumus ei vielä lähetä pyyntöä.
            </p>
            <button
              className="button secondary small-button"
              onClick={() =>
                setState((s) => ({
                  ...s,
                  consent: true,
                  consentProvider: AI_CONSENT_PROVIDER,
                }))
              }
            >
              Hyväksyn AI-pyyntöjen lähettämisen
            </button>
          </div>
        </div>
      )}
      <div className="segmented" aria-label="AI-opettajan tila">
        {modes.map((m) => (
          <button
            key={m.id}
            aria-pressed={mode === m.id}
            disabled={busy}
            onClick={() => {
              setMode(m.id);
              setError("");
            }}
          >
            {m.label}
          </button>
        ))}
      </div>
      {replies.map((r, i) => (
        <div className="ai-exchange" key={i}>
          <div className="student-message">{r.question}</div>
          <div className="ai-message">
            <Bot size={20} />
            <div>
              <p>{r.response.reply}</p>
              {r.response.score !== null && (
                <strong className="score-tag">
                  AI-arvio {r.response.score}/4 · ei virallinen arvosana
                </strong>
              )}
              {r.response.strengths.length > 0 && (
                <>
                  <h4>Toimii jo</h4>
                  <ul>
                    {r.response.strengths.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </>
              )}
              {r.response.improvements.length > 0 && (
                <>
                  <h4>Vahvista seuraavaksi</h4>
                  <ul>
                    {r.response.improvements.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </>
              )}
              {r.response.nextQuestion && (
                <p className="next-question">{r.response.nextQuestion}</p>
              )}
              <small>
                Opetuskonteksti: {r.response.source.title}, kirjan s.{" "}
                {r.response.source.book.join("–")} · {r.response.model}
              </small>
            </div>
          </div>
        </div>
      ))}
      <form onSubmit={submit} className="ai-form">
        {mode === "grade" ? (
          <div className="grade-preview">
            <strong>Arvioitava oma vastaus</strong>
            <p>
              {answer ||
                "Kirjoita ensin vastaus tehtävän vastauskenttään. AI arvioi juuri sen tehtävän rubriikilla."}
            </p>
          </div>
        ) : (
          <>
            <label htmlFor={`ai-${lessonId}`}>
              {mode === "hint"
                ? "Mihin tarvitset yhden vihjeen?"
                : mode === "dialogue"
                  ? "Kerro ajatuksesi, niin jatketaan siitä"
                  : "Minkä asian haluat ymmärtää?"}
            </label>
            <textarea
              id={`ai-${lessonId}`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={3000}
              rows={3}
              placeholder="Esim. Miksi mieliala ja mielenterveys ovat eri asioita?"
              disabled={busy}
            />
            <span className="char-count">{message.length}/3000</span>
          </>
        )}
        {error && <Notice kind="error">{error}</Notice>}
        <div className="form-footer">
          <small>AI voi erehtyä. Tarkista perustelut oppitunnista.</small>
          <button
            className="button"
            disabled={
              !online ||
              !status?.configured ||
              status.accessRequired ||
              !hasProviderConsent ||
              busy ||
              (mode === "grade" ? answer.trim().length < 20 : !message.trim())
            }
          >
            {busy ? (
              <LoaderCircle className="spin" size={17} />
            ) : (
              <Send size={17} />
            )}{" "}
            {busy
              ? "Opettaja pohtii…"
              : mode === "grade"
                ? "Lähetä vastaus arvioon"
                : "Kysy opettajalta"}
          </button>
          {busy && (
            <button
              className="text-button"
              type="button"
              onClick={() => abort.current?.abort()}
            >
              Keskeytä
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
