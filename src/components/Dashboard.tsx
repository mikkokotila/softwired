import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Brain,
  Check,
  ChevronRight,
  Clock3,
  Heart,
  Lightbulb,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { lessons, sections } from "../content";
import { useStudy } from "../lib/store";
import { nextLesson, reviewQueue, stats } from "../lib/learning";
import { localDay } from "../lib/storage";
import { ArrowLink, ButtonLink, PageHeading, ProgressBar } from "./ui";
export function Dashboard() {
  const { state } = useStudy();
  const s = stats(state.objectives);
  const next = nextLesson(state.objectives);
  const due = reviewQueue(state.objectives);
  const today = state.activity.find((a) => a.day === localDay());
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 6 + i);
    return d;
  });
  return (
    <>
      <PageHeading eyebrow="OMA TAHTI. OMA POLKU." title="Hyvä päivä oivaltaa.">
        <span className="date-label">
          {new Intl.DateTimeFormat("fi-FI", {
            day: "numeric",
            month: "long",
          }).format(new Date())}
          <span className="live-dot" />
          Sinun oppimistilasi
        </span>
      </PageHeading>
      <div className="dashboard-grid">
        <section className="hero-card">
          <div className="hero-content">
            <span className="hero-badge">
              <span />
              PIENI HETKI, ISO OIVALLUS
            </span>
            <h2>
              Yksi pieni kipinä.
              <br />
              <span>Aina vähän varmempi.</span>
            </h2>
            <p>
              Terveystiedon koe haltuun yksi oivallus kerrallaan. Tänään riittää
              20 minuutin oma hetki.
            </p>
            <ButtonLink href="#/session">Aloita päivän 20 minuuttia</ButtonLink>
            <span className="hero-caption">
              <ShieldCheck size={14} /> Oma edistyminen tallentuu tälle
              laitteelle
            </span>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="orb-center">
              <Sparkles size={39} />
              <strong>
                20<span>min</span>
              </strong>
              <small>AIKAA ITSELLESI</small>
            </div>
            <div className="orbit-icon orbit-brain">
              <Brain size={29} />
            </div>
            <div className="orbit-icon orbit-heart">
              <Heart size={25} />
            </div>
            <div className="orbit-icon orbit-light">
              <Lightbulb size={25} />
            </div>
            <div className="spark spark-one">✳</div>
            <div className="spark spark-two">+</div>
            <span className="art-label">ymmärrä. muista. sovella.</span>
          </div>
        </section>
        <section className="week-card card">
          <div className="section-label">
            <span className="eyebrow">SINUN VIIKKOSI</span>
            <span className="icon-circle">
              <Target size={18} />
            </span>
          </div>
          <h2>Tilaa oppimiselle.</h2>
          <p className="muted small">
            Jokainen hetki auttaa. Taukopäiväkin on sallittu.
          </p>
          <div className="week-dots">
            {dates.map((d) => {
              const active = state.activity.some((a) => a.day === localDay(d));
              const isToday = localDay(d) === localDay();
              return (
                <div key={d.toISOString()}>
                  <span>
                    {new Intl.DateTimeFormat("fi-FI", {
                      weekday: "narrow",
                    }).format(d)}
                  </span>
                  <span
                    className={`day-circle ${active ? "active" : ""} ${isToday ? "today" : ""}`}
                    aria-label={`${d.toLocaleDateString("fi-FI")}: ${active ? "opiskeltu" : "ei merkintää"}`}
                  >
                    {active ? <Check size={15} /> : d.getDate()}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="week-bottom">
            <span>
              <strong>{today?.lessons ?? 0}</strong> oppituntia tänään
            </span>
            <span>
              <strong>{today?.reviews ?? 0}</strong> kertausta
            </span>
          </div>
        </section>
      </div>
      <div className="stat-grid">
        <div className="stat-item">
          <span className="icon-square lilac">
            <BookOpen size={20} />
          </span>
          <div>
            <strong>
              {s.completed}
              <span> / {lessons.length}</span>
            </strong>
            <p>Oppituntia läpikäyty</p>
          </div>
        </div>
        <div className="stat-item">
          <span className="icon-square lime">
            <Target size={20} />
          </span>
          <div>
            <strong>
              {s.mastered}
              <span> / {lessons.length}</span>
            </strong>
            <p>Osaamistavoitetta hallussa</p>
          </div>
        </div>
        <div className="stat-item">
          <span className="icon-square peach">
            <RotateCcw size={20} />
          </span>
          <div>
            <strong>
              {due.length}
              <span> tehtävää</span>
            </strong>
            <p>Valmiina kertaukseen</p>
          </div>
          <a
            href="#/practice"
            className="round-link"
            aria-label="Siirry kertaukseen"
          >
            <ArrowUpRight size={19} />
          </a>
        </div>
      </div>
      <div className="content-columns">
        <section>
          <div className="section-heading">
            <h2>Seuraava oivallus</h2>
            <ArrowLink href="#/course">Koko oppimispolku</ArrowLink>
          </div>
          <a className="next-lesson-card" href={`#/lesson/${next.id}`}>
            <div className="lesson-art lilac">
              <Brain size={38} />
              <span className="tiny-spark">✳</span>
            </div>
            <div className="next-lesson-content">
              <span className="eyebrow">
                {next.sectionId} ·{" "}
                {sections.find((x) => x.id === next.sectionId)?.group}
              </span>
              <h3>{next.title}</h3>
              <p>{next.hook}</p>
              <span className="lesson-meta">
                <Clock3 size={14} /> noin {next.minutes} min <span>•</span> Lue,
                muista ja sovella
              </span>
            </div>
            <span className="round-link dark">
              <ArrowRight size={20} />
            </span>
          </a>
          <div className="section-heading course-preview-heading">
            <h2>Kaikki alkaa ymmärtämisestä.</h2>
            <span className="small muted">13 osiota · 52 oppituntia</span>
          </div>
          <div className="topic-preview-grid">
            {[
              {
                title: "Mieli ja ihmissuhteet",
                icon: Brain,
                color: "lilac",
                count: 3,
              },
              {
                title: "Päihteet ja valinnat",
                icon: ShieldCheck,
                color: "peach",
                count: 3,
              },
              {
                title: "Ravinto ja liike",
                icon: Heart,
                color: "lime",
                count: 3,
              },
              { title: "Ensiapu", icon: Target, color: "blue", count: 4 },
            ].map((x) => (
              <a
                href={`#/course?group=${encodeURIComponent(x.title)}`}
                key={x.title}
                className="topic-preview"
              >
                <span className={`icon-square ${x.color}`}>
                  <x.icon size={23} />
                </span>
                <h3>{x.title}</h3>
                <span>
                  {x.count} osiota
                  <ChevronRight size={16} />
                </span>
              </a>
            ))}
          </div>
        </section>
        <aside className="dashboard-aside">
          <section className="readiness-card card">
            <div className="section-label">
              <span className="eyebrow">VAHVISTUVA OSAAMINEN</span>
              <Sparkles size={17} />
            </div>
            <h2>
              Harjoituksesta
              <br /> varmuuteen.
            </h2>
            <div className="readiness-number">
              {Math.round((s.mastered / lessons.length) * 100)}
              <span>%</span>
            </div>
            <ProgressBar
              value={(s.mastered / lessons.length) * 100}
              label="Hallittujen tavoitteiden osuus"
            />
            <p className="small muted">
              Osaaminen varmistuu itsenäisillä tehtävillä ja viivästetyllä
              muistamisella. Lukeminen on vasta alku.
            </p>
            <ArrowLink href="#/progress">Näytä oma edistyminen</ArrowLink>
          </section>
          <a href="#/tutor" className="tutor-teaser">
            <span className="icon-square">
              <Sparkles size={21} />
            </span>
            <h3>Jäikö jokin mietityttämään?</h3>
            <p>Oma AI-opettaja auttaa ymmärtämään ja perustelemaan.</p>
            <span className="text-link">
              Tutustu opettajaan
              <ArrowUpRight size={17} />
            </span>
          </a>
        </aside>
      </div>
    </>
  );
}
