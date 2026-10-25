import { useEffect, useRef, useState } from "react";
import {
  Download,
  HardDrive,
  RefreshCw,
  ShieldCheck,
  Trash2,
  Upload,
} from "lucide-react";
import { medicalNote } from "../content";
import { useStudy } from "../lib/store";
import {
  freshState,
  parseBackup,
  type StudyState,
  STORAGE_KEY,
} from "../lib/storage";
import { getAIStatus, unlockAI, type AIStatus } from "../lib/api";
import { AI_CONSENT_PROVIDER } from "../lib/storage";
import { useOnline } from "../lib/hooks";
import { Notice, PageHeading } from "./ui";
function download(text: string, name: string) {
  const url = URL.createObjectURL(
    new Blob([text], { type: "application/json" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function Settings({
  offlineReady,
  install,
  updateAvailable,
  update,
}: {
  offlineReady: boolean;
  install?: () => void;
  updateAvailable: boolean;
  update: () => void;
}) {
  const { state, setState, storageError, repairStorage } = useStudy();
  const online = useOnline();
  const [status, setStatus] = useState<AIStatus | null>(null);
  const [apiError, setApiError] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState<StudyState | null>(null);
  const [remove, setRemove] = useState(false);
  const [removeText, setRemoveText] = useState("");
  const importInput = useRef<HTMLInputElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const refresh = () => {
    setApiError("");
    getAIStatus()
      .then(setStatus)
      .catch(() => {
        setStatus(null);
        setApiError(
          "API-palvelin ei vastaa. Tarkista, että npm run dev tai npm run serve on käynnissä.",
        );
      });
  };
  useEffect(() => {
    const c = new AbortController();
    getAIStatus(c.signal)
      .then(setStatus)
      .catch(() => {
        if (!c.signal.aborted)
          setApiError(
            "API-palvelin ei vastaa. Tarkista palvelimen käynnistys ja verkko.",
          );
      });
    return () => c.abort();
  }, []);
  useEffect(() => {
    if (pending || remove) dialog.current?.showModal();
    else dialog.current?.close();
  }, [pending, remove]);
  const exportState = () =>
    download(
      JSON.stringify(state, null, 2),
      `kipina-varmuuskopio-${new Date().toISOString().slice(0, 10)}.json`,
    );
  return (
    <>
      <PageHeading
        eyebrow="ASETUKSET JA TIETOSUOJA"
        title="Oma oppimistila, omat tiedot."
      />
      <div className="settings-grid">
        <section className="card settings-section">
          <span className="icon-square lime">
            <HardDrive size={24} />
          </span>
          <h2>Edistyminen tällä laitteella</h2>
          <p>
            Oppituntien vastaukset, kertaukset ja kokeet tallennetaan selaimeen.
            Tietoja ei synkronoida muihin laitteisiin. Selaintietojen
            poistaminen poistaa myös edistymisen.
          </p>
          <div className="setting-row">
            <label htmlFor="exam-date">
              Oman kokeen päivämäärä
              <small>
                Vapaaehtoinen suunnittelutieto, säilyy vain selaimessa.
              </small>
            </label>
            <input
              id="exam-date"
              type="date"
              value={state.examDate}
              onChange={(e) =>
                setState((s) => ({ ...s, examDate: e.target.value }))
              }
            />
          </div>
          <div className="assessment-options">
            <button className="button secondary" onClick={exportState}>
              <Download size={17} />
              Vie varmuuskopio
            </button>
            <button
              className="button secondary"
              onClick={() => importInput.current?.click()}
            >
              <Upload size={17} />
              Tuo varmuuskopio
            </button>
          </div>
          <input
            ref={importInput}
            className="sr-only"
            type="file"
            accept=".json,application/json"
            aria-label="Valitse Kipinän varmuuskopiotiedosto"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setError("");
              setMessage("");
              try {
                if (file.size > 2_000_000)
                  throw new Error(
                    "Varmuuskopio on liian suuri (enintään 2 Mt).",
                  );
                setPending(parseBackup(await file.text()));
              } catch (err) {
                setError(
                  err instanceof Error
                    ? err.message
                    : "Varmuuskopiota ei voitu lukea.",
                );
              }
              e.target.value = "";
            }}
          />
          <p className="small muted">
            Varmuuskopio sisältää kirjoittamasi vastaukset. Säilytä se omassa
            turvallisessa paikassa.
          </p>
          {storageError && (
            <>
              <Notice kind="error">{storageError}</Notice>
              <button
                className="button secondary"
                onClick={() => {
                  try {
                    const raw = localStorage.getItem(STORAGE_KEY);
                    if (raw) download(raw, "kipina-vanha-tallenne.json");
                  } catch {
                    setError("Vanhaa tallennetta ei voitu lukea.");
                  }
                }}
              >
                Vie vanha selaintallenne
              </button>
              <button className="text-button" onClick={repairStorage}>
                Salli nykyisen istunnon tallentaminen
              </button>
            </>
          )}
          <div className="divider" />
          <button
            className="text-button danger"
            onClick={() => setRemove(true)}
          >
            <Trash2 size={16} />
            Poista tämän laitteen edistyminen
          </button>
        </section>
        <section className="card settings-section">
          <span className="icon-square lilac">
            <ShieldCheck size={24} />
          </span>
          <h2>AI-yhteys ja suostumus</h2>
          <div className="api-status-line">
            <span
              className={`live-dot ${status?.configured ? "" : "muted-dot"}`}
            />
            <strong>
              {!online
                ? "AI tarvitsee verkkoyhteyden"
                : status
                  ? status.message
                  : apiError
                    ? "AI-palvelin ei vastaa"
                    : "Tarkistetaan…"}
            </strong>
          </div>
          <p className="small">
            Malli: <strong>{status?.model ?? "gpt-6-astra"}</strong>. Avaimen
            määrittäminen ei vielä varmista mallin käyttöoikeutta. Yhteys
            varmistuu vasta onnistuneella pyynnöllä. Mallia ei vaihdeta
            automaattisesti.
          </p>
          {apiError && <Notice kind="error">{apiError}</Notice>}
          <button className="button secondary small-button" onClick={refresh}>
            <RefreshCw size={15} />
            Päivitä tila
          </button>
          <p className="small">
            OpenAI API on maksullinen. Hinta riippuu mallista ja tokenimäärästä.
            Kiinteää hinta-arviota ei näytetä, koska ajantasaista tilikohtaista
            hintaa ei ole vahvistettu.
          </p>
          <p className="small">
            Kysymys, vastaus, oppitunnin teksti ja keskustelutilan viimeiset
            viestit lähetetään OpenAI API -palveluun vain pyynnöstäsi. API
            käyttää asetusta <code>store: false</code>. Tämä ei ole lupaus
            kaikesta palveluntarjoajan lokituksesta tai säilytysajoista.
            API-syötteitä ja vastauksia ei käytetä mallien kouluttamiseen
            oletusarvoisesti, mutta väärinkäytön valvontalokeja voidaan
            säilyttää oletusarvoisesti enintään 30 päivää, ellei pidempi
            säilytys ole tarpeen lain tai turvallisuuden vuoksi. Älä lähetä omia
            tai muiden yksityisiä henkilötietoja. Alaikäisen on hyvä keskustella
            käytöstä huoltajan kanssa.
          </p>
          <label className="toggle-row">
            <input
              type="checkbox"
              checked={
                state.consent && state.consentProvider === AI_CONSENT_PROVIDER
              }
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  consent: e.target.checked,
                  consentProvider: e.target.checked
                    ? AI_CONSENT_PROVIDER
                    : undefined,
                }))
              }
            />
            <span>
              Sallin omien AI-pyyntöjeni lähettämisen OpenAI API -palveluun.
              <small>
                Älä lähetä omia tai toisten arkaluonteisia tietoja. Suostumuksen
                muuttaminen ei lähetä API-pyyntöä.
              </small>
            </span>
          </label>
          {status?.accessRequired && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setApiError("");
                try {
                  await unlockAI(token, status.csrf);
                  setToken("");
                  refresh();
                } catch (err) {
                  setApiError(
                    err instanceof Error
                      ? err.message
                      : "Yhteyden avaaminen epäonnistui.",
                  );
                }
              }}
            >
              <label htmlFor="access-token">
                Ylläpitäjän antama käyttöavain
              </label>
              <input
                id="access-token"
                type="password"
                autoComplete="off"
                value={token}
                maxLength={256}
                onChange={(e) => setToken(e.target.value)}
              />
              <button className="button" disabled={!token}>
                Avaa AI:n käyttöoikeus
              </button>
            </form>
          )}
          <details className="setup-details">
            <summary>Ylläpitäjän käyttöönotto</summary>
            <p>
              Lisää OpenAI API -avain vain palvelimen .env-tiedostoon:{" "}
              <code>OPENAI_API_KEY</code>. Oletusmalli on{" "}
              <code>gpt-6-astra</code>; mallin voi määrittää{" "}
              <code>OPENAI_MODEL</code>-asetuksella. Käynnistä palvelin
              uudelleen. Avainta ei koskaan kirjoiteta selaimeen tai
              VITE_-muuttujaan.
            </p>
          </details>
        </section>
        <section className="card settings-section">
          <h2>Asennus ja offline-käyttö</h2>
          <p>
            {offlineReady
              ? "Oppisisällöt on tallennettu offline-käyttöön tällä selaimella."
              : "Offline-valmiutta ei ole vielä vahvistettu. Avaa tuotantoversio verkossa kerran ja odota sovelluksen tallentumista."}
          </p>
          <p className="small">
            Safari: Jaa → Lisää Koti-valikkoon. Chrome: Asenna sovellus
            osoiterivin valikosta. AI tarvitsee aina verkkoyhteyden ja toimivan
            palvelimen.
          </p>
          {install && (
            <button className="button" onClick={install}>
              Asenna Kipinä
            </button>
          )}
          {updateAvailable && (
            <button className="button secondary" onClick={update}>
              Ota tallennettu päivitys käyttöön
            </button>
          )}
        </section>
        <section className="card settings-section">
          <h2>Lähteet ja sisällön rajat</h2>
          <p>
            Kurssi perustuu annettuun 65-sivuiseen Hippokrates / Yläkoulun
            terveystieto 8 -skannaukseen. Oppitunnit ovat itsenäistä
            opetustekstiä, eivät kirjan lainauksia. Sivukartta on mukana
            jokaisella oppitunnilla.
          </p>
          <p className="small">
            Historialliset kuvaajat päättyvät vuoteen 2014. Vanhoja
            lakiyksityiskohtia ei esitetä nykytilana. Sanastosta on integroitu
            näihin 13 osioon liittyvät ydinkäsitteet.
          </p>
          <Notice>{medicalNote.text}</Notice>
          <p className="small">
            Ensiavun verkkolähteet tarkistettu {medicalNote.checkedAt}. Myös
            terveystiedon opettajan sisältötarkastus tarvitaan ennen
            koulukäyttöä.
          </p>
          <ul className="source-links">
            {medicalNote.sources.map(([title, url]) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noreferrer">
                  {title} ↗
                </a>
              </li>
            ))}
          </ul>
          <p className="small">
            Tarkemmat lähdekorjaukset ja kattavuusrajat ovat projektin
            docs/SOURCE_REVIEW.md-tiedostossa.
          </p>
        </section>
      </div>
      {message && <Notice>{message}</Notice>}
      {error && <Notice kind="error">{error}</Notice>}
      <dialog
        ref={dialog}
        onCancel={() => {
          setPending(null);
          setRemove(false);
          setRemoveText("");
        }}
        aria-labelledby="data-dialog-title"
      >
        <div className="dialog-content">
          <h2 id="data-dialog-title">
            {pending
              ? "Korvataanko nykyinen edistyminen?"
              : "Poistetaanko paikalliset tiedot?"}
          </h2>
          <p>
            {pending
              ? `Varmuuskopiossa on ${Object.keys(pending.objectives).length} tavoitteen merkintöjä ja ${pending.exams.length} koetta. Vienti säilyttää nykyiset tiedot ennen korvaamista.`
              : "Poisto koskee tämän selaimen vastauksia, kokeita ja edistymistä. Vie halutessasi varmuuskopio ensin. Kirjoita POISTA vahvistaaksesi."}
          </p>
          <button className="button secondary" onClick={exportState}>
            Vie nykyiset tiedot ensin
          </button>
          {remove && (
            <>
              <label htmlFor="remove-confirm">Vahvistus</label>
              <input
                id="remove-confirm"
                value={removeText}
                onChange={(e) => setRemoveText(e.target.value)}
                autoComplete="off"
              />
            </>
          )}
          <div className="assessment-options">
            <button
              className="button"
              disabled={remove && removeText !== "POISTA"}
              onClick={() => {
                setState(pending ?? { ...freshState(), onboarded: true });
                repairStorage();
                setPending(null);
                setRemove(false);
                setRemoveText("");
                setMessage(
                  pending
                    ? "Varmuuskopio tuotu. AI-suostumus pyydetään uudelleen."
                    : "Tämän laitteen edistyminen poistettu.",
                );
              }}
            >
              {pending ? "Korvaa varmuuskopiolla" : "Poista tiedot"}
            </button>
            <button
              className="button secondary"
              autoFocus
              onClick={() => {
                setPending(null);
                setRemove(false);
                setRemoveText("");
              }}
            >
              Peruuta
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
