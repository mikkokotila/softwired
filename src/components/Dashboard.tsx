import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Check,
  Clock3,
  HeartPulse,
  Map,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Swords,
  Target,
  Zap,
} from "lucide-react";
import { lessons, sections } from "../content";
import { useStudy } from "../lib/store";
import { nextLesson, reviewQueue, stats } from "../lib/learning";
import { localDay } from "../lib/storage";
import { ProgressBar } from "./ui";

const topics = [
  {
    label: "Mieli ja ihmissuhteet",
    icon: Brain,
    tone: "violet",
    count: 3,
    description: "Ajatukset, tunteet ja suhteet",
  },
  {
    label: "Päihteet ja valinnat",
    icon: ShieldCheck,
    tone: "amber",
    count: 3,
    description: "Vaikutukset ja turvalliset valinnat",
  },
  {
    label: "Ravinto ja liike",
    icon: HeartPulse,
    tone: "cyan",
    count: 3,
    description: "Keho ja hyvinvointi",
  },
  {
    label: "Ensiapu",
    icon: Target,
    tone: "lime",
    count: 4,
    description: "Osaaminen, josta voi olla apua",
  },
] as const;

export function Dashboard() {
  const { state } = useStudy();
  const summary = stats(state.objectives);
  const next = nextLesson(state.objectives);
  const due = reviewQueue(state.objectives);
  const finishedSections = sections.filter((section) =>
    section.lessons.every(
      (lesson) => !!state.objectives[lesson.id]?.completedAt,
    ),
  ).length;
  const currentRegion = Math.min(finishedSections + 1, sections.length);

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 6 + i);
    return d;
  });

  return (
    <div className="command-dashboard">
      <div className="command-meta">
        <span className="command-kicker">
          <span className="live-dot" /> OMA TEHTÄVÄKESKUS · TERVEYSTIETO 8
        </span>
        <span className="command-status">
          {new Intl.DateTimeFormat("fi-FI", {
            day: "numeric",
            month: "long",
          }).format(new Date())}{" "}
          · Edistyminen tallessa
        </span>
      </div>

      <section className="command-hero" aria-labelledby="command-hero-title">
        <div className="command-hero-copy">
          <p className="mission-kicker">PÄIVÄN PÄÄTEHTÄVÄ · TERVEYSTIETO 8</p>
          <h1 id="command-hero-title">
            Ota koe <span>haltuun.</span>
          </h1>
          <p className="command-hero-description">
            13 aihealuetta. 52 tehtäväpolkua. Yksi tavoite: ymmärrät asiat
            oikeasti — et vain tunnista oikeaa vastausta.
          </p>
          <div className="command-hero-actions">
            <a href={"#/lesson/" + next.id} className="button">
              <Zap size={18} fill="currentColor" />{" "}
              {summary.completed
                ? "JATKA TEHTÄVÄÄ"
                : "ALOITA ENSIMMÄINEN TEHTÄVÄ"}
            </a>
            <a href="#/course" className="button secondary">
              <Map size={17} /> KATSO KARTTA
            </a>
          </div>
          <p className="command-hero-save">
            <ShieldCheck size={14} /> Vastaukset tallentuvat tälle laitteelle
          </p>
        </div>
        <div className="command-hero-scene" aria-hidden="true">
          <div className="command-orbit command-orbit-back" />
          <div className="command-planet" />
          <div className="command-orbit command-orbit-front" />
          <div className="command-floating-top">
            ALUE {String(currentRegion).padStart(2, "0")} / {sections.length}
          </div>
          <div className="command-floating-status">
            <strong>MISSION STATUS</strong>
            <span>
              ✦ {summary.completed} / {lessons.length} TEHTÄVÄÄ
            </span>
          </div>
          <span className="command-space-spark command-space-spark-one">✦</span>
          <span className="command-space-spark command-space-spark-two">✳</span>
        </div>
      </section>

      <div className="mission-section-heading">
        <div>
          <p className="eyebrow">MISSION SELECT</p>
          <h2>Valitse seuraava tehtävä</h2>
        </div>
        <span>Oma tahti · ei pakollisia putkia</span>
      </div>

      <div className="mission-grid">
        <a
          className="mission-card mission-card-featured"
          href={"#/lesson/" + next.id}
        >
          <span className="mission-card-symbol" aria-hidden="true">
            <Brain size={88} />
          </span>
          <span className="mission-card-tag">
            01 · {summary.completed ? "JATKA TÄSTÄ" : "ALOITA TÄSTÄ"}
          </span>
          <h3>{next.title}</h3>
          <p>{next.hook}</p>
          <span className="mission-card-action">
            AVAA TEHTÄVÄ <ArrowUpRight size={18} />
          </span>
        </a>
        <a className="mission-card mission-card-recall" href="#/practice">
          <span className="mission-card-symbol" aria-hidden="true">
            <RotateCcw size={80} />
          </span>
          <span className="mission-card-tag">02 · KERTAUS</span>
          <h3>Muistitreeni</h3>
          <p>
            {due.length
              ? due.length +
                " ajankohtaista kertausta. Testaa, mitä muistat ilman mallia."
              : "Kun olet oppinut uusia asioita, voit vahvistaa niitä täällä."}
          </p>
          <span className="mission-card-action">
            KERTAA NYT <ArrowUpRight size={18} />
          </span>
        </a>
        <a className="mission-card mission-card-boss" href="#/exam">
          <span className="mission-card-symbol" aria-hidden="true">
            <Swords size={78} />
          </span>
          <span className="mission-card-tag">03 · BOSS LEVEL</span>
          <h3>Koeareena</h3>
          <p>
            15 tai 40 minuutin koemainen haaste. Näytä, miten osaat selittää ja
            perustella.
          </p>
          <span className="mission-card-action">
            VALMISTAUDU <ArrowUpRight size={18} />
          </span>
        </a>
      </div>

      <div className="command-lower-grid">
        <section className="command-panel">
          <div className="command-panel-title">
            <span className="eyebrow">OMA ETENEMINEN</span>
            <span className="command-panel-icon">
              <Sparkles size={18} />
            </span>
          </div>
          <h3>Olet jo matkalla.</h3>
          <div className="command-progress-label">
            <span>Oppimispolun eteneminen</span>
            <strong>
              {summary.completed} / {lessons.length}
            </strong>
          </div>
          <ProgressBar
            value={(summary.completed / lessons.length) * 100}
            label="Suoritettujen oppituntien osuus"
          />
          <div className="command-metrics">
            <span>
              <strong>{sections.length}</strong> aihealuetta
            </span>
            <span>
              <strong>{summary.mastered}</strong> hallussa
            </span>
            <span>
              <strong>{due.length}</strong> kertausta
            </span>
          </div>
          <a className="command-panel-link" href="#/progress">
            Näytä oma edistyminen <ArrowRight size={17} />
          </a>
        </section>

        <section className="command-panel command-choice-panel">
          <div className="command-panel-title">
            <span className="eyebrow">VALITSE PELITAPA</span>
            <span className="command-panel-icon">
              <Clock3 size={18} />
            </span>
          </div>
          <h3>Miten haluat opiskella tänään?</h3>
          <p>
            Valitse sopiva aika. Kaikki vaihtoehdot vievät kohti samaa
            tavoitetta.
          </p>
          <div className="command-quick-links">
            <a href={"#/lesson/" + next.id}>
              <Zap size={15} /> 5 min
            </a>
            <a href="#/session">
              <Target size={15} /> 20 min
            </a>
            <a href="#/course">
              <Map size={15} /> Vapaasti
            </a>
          </div>
        </section>
      </div>

      <div className="mission-section-heading mission-topic-heading">
        <div>
          <p className="eyebrow">WORLD MAP</p>
          <h2>Tutki aihealueita</h2>
        </div>
        <a href="#/course" className="command-all-link">
          Koko oppimispolku <ArrowRight size={17} />
        </a>
      </div>
      <div className="command-world-grid">
        {topics.map((topic, index) => {
          const chapterLessons = sections
            .filter((s) => s.group === topic.label)
            .flatMap((s) => s.lessons);
          const complete = chapterLessons.filter(
            (l) => !!state.objectives[l.id]?.completedAt,
          ).length;
          return (
            <a
              key={topic.label}
              href={"#/course?group=" + encodeURIComponent(topic.label)}
              className={"command-world-card tone-" + topic.tone}
            >
              <span className="command-world-no">
                SEKTORI {String(index + 1).padStart(2, "0")}
              </span>
              <topic.icon size={28} />
              <h3>{topic.label}</h3>
              <p>{topic.description}</p>
              <span className="command-world-bottom">
                {complete} / {chapterLessons.length} tehtävää{" "}
                <ArrowUpRight size={17} />
              </span>
            </a>
          );
        })}
      </div>

      <section className="command-week">
        <div>
          <p className="eyebrow">VIIKON JÄLKI</p>
          <h2>Jokainen oppimiskerta auttaa.</h2>
          <p>Taukopäiväkin on sallittu. Tätä ei tarvitse suorittaa putkeen.</p>
        </div>
        <div className="command-week-days">
          {dates.map((date) => {
            const key = localDay(date);
            const active = state.activity.some((entry) => entry.day === key);
            const isToday = key === localDay();
            return (
              <div className="command-week-day" key={key}>
                <span>
                  {new Intl.DateTimeFormat("fi-FI", {
                    weekday: "narrow",
                  }).format(date)}
                </span>
                <span
                  className={
                    "command-week-dot " +
                    (active ? "is-complete " : "") +
                    (isToday ? "is-today" : "")
                  }
                  aria-label={
                    date.toLocaleDateString("fi-FI") +
                    (active ? ": opiskeltu" : ": ei merkintää")
                  }
                >
                  {active ? <Check size={15} /> : date.getDate()}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
