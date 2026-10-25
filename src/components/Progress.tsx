import { BarChart3, CheckCircle2, Eye, PencilLine, Target } from "lucide-react";
import { lessons, sections } from "../content";
import { useStudy } from "../lib/store";
import { mastery, stats } from "../lib/learning";
import { localDay } from "../lib/storage";
import { PageHeading, ProgressBar } from "./ui";
export function Progress() {
  const { state } = useStudy();
  const s = stats(state.objectives);
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 13 + i);
    const a = state.activity.find((a) => a.day === localDay(d));
    return { date: d, count: (a?.lessons ?? 0) + (a?.reviews ?? 0) };
  });
  const max = Math.max(4, ...days.map((d) => d.count));
  return (
    <>
      <PageHeading
        eyebrow="OMA EDISTYMINEN"
        title="Katso, mikä on jo vahvistunut."
      >
        <span className="pill">Tiedot vain tällä laitteella</span>
      </PageHeading>
      <p className="page-intro">
        Nähty, harjoiteltu ja hallittu ovat eri asioita. Varmuus rakentuu siitä,
        mitä saat palautettua mieleen ja sovellettua.
      </p>
      <div className="progress-stats">
        {[
          {
            icon: Eye,
            label: "Nähty vähintään kerran",
            value: s.seen,
            color: "blue",
          },
          {
            icon: PencilLine,
            label: "Harjoiteltu tehtävillä",
            value: s.practiced,
            color: "lilac",
          },
          {
            icon: CheckCircle2,
            label: "Hallintakriteeri täyttyy",
            value: s.mastered,
            color: "lime",
          },
        ].map((x) => (
          <div className="card" key={x.label}>
            <span className={`icon-square ${x.color}`}>
              <x.icon size={23} />
            </span>
            <strong>
              {x.value}
              <small> / {lessons.length}</small>
            </strong>
            <p>{x.label}</p>
          </div>
        ))}
      </div>
      <section className="card activity-card">
        <div className="section-heading">
          <div>
            <span className="eyebrow">VIIMEISET 14 PÄIVÄÄ</span>
            <h2>Omat oppimishetket</h2>
          </div>
          <BarChart3 size={24} />
        </div>
        <div
          className="activity-chart"
          role="img"
          aria-label={days
            .map(
              (d) =>
                `${d.date.toLocaleDateString("fi-FI")}: ${d.count} oppituntia tai kertausta`,
            )
            .join("; ")}
        >
          {days.map((d) => (
            <div key={localDay(d.date)}>
              <span className="bar-count">{d.count || ""}</span>
              <span
                className={`activity-bar ${d.count ? "filled" : ""}`}
                style={{ height: `${Math.max(3, (d.count / max) * 120)}px` }}
              />
              <span className="small">{d.date.getDate()}.</span>
            </div>
          ))}
        </div>
        <p className="small muted">
          Pylväs = valmistuneet oppitunnit ja kertaukset. Tyhjä päivä ei nollaa
          mitään.
        </p>
      </section>
      <div className="section-heading">
        <h2>Osaaminen aiheittain</h2>
        <Target size={21} />
      </div>
      <div className="insights-list">
        {sections.map((sec) => {
          const list = sec.lessons.map((l) => mastery(state.objectives[l.id]));
          const mastered = list.filter((x) => x === "mastered").length;
          const practiced = list.filter((x) => x === "practiced").length;
          const seen = list.filter((x) => x === "seen").length;
          return (
            <a
              className="card insight-row"
              key={sec.id}
              href={`#/lesson/${sec.lessons.find((l) => mastery(state.objectives[l.id]) !== "mastered")?.id ?? sec.lessons[0].id}`}
            >
              <span className={`section-number ${sec.color}`}>{sec.id}</span>
              <div className="insight-content">
                <h3>{sec.title}</h3>
                <div
                  className="mastery-stacked"
                  role="img"
                  aria-label={`${mastered} hallittu, ${practiced} harjoiteltu, ${seen} nähty, ${4 - mastered - practiced - seen} aloittamatta`}
                >
                  <span
                    className="mastered"
                    style={{ width: `${(mastered / 4) * 100}%` }}
                  />
                  <span
                    className="practiced"
                    style={{ width: `${(practiced / 4) * 100}%` }}
                  />
                  <span
                    className="seen"
                    style={{ width: `${(seen / 4) * 100}%` }}
                  />
                </div>
                <p>
                  {mastered} hallittu · {practiced} harjoiteltu · {seen} nähty
                </p>
              </div>
              <span className="small">{mastered}/4 →</span>
            </a>
          );
        })}
      </div>
      <div className="card mastery-explainer">
        <h2>Mitä ”hallittu” tarkoittaa?</h2>
        <p>
          Vähintään kaksi eri tarkistettua tehtävää on onnistunut itsenäisesti.
          Lisäksi tarvitaan joko vähintään vuorokauden viiveellä tehty hyvä
          muistinvarainen vastaus (oma arvio vähintään 3/4) tai itsenäinen
          AI-arvioitu sovellus vähintään 3/4.
        </p>
        <p>
          Itsearvioon perustuva hallinta merkitään erikseen. Mallin näkemisen
          jälkeen pyydetty AI-palaute ei todista itsenäistä osaamista. Tuodun
          varmuuskopion tiedot ovat paikallisia merkintöjä, eivät palvelimella
          varmennettu tutkinto.
        </p>
        <ProgressBar
          value={(s.mastered / lessons.length) * 100}
          label="Hallintakriteerin täyttävien tavoitteiden osuus"
        />
      </div>
    </>
  );
}
