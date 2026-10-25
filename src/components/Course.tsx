import { useState } from "react";
import { ArrowRight, BookOpen, Search } from "lucide-react";
import { glossary, lessons, sections } from "../content";
import { useStudy } from "../lib/store";
import { mastery } from "../lib/learning";
import { EmptyState, PageHeading, ProgressBar, StatusPill } from "./ui";
export function Course({ group = "" }: { group?: string }) {
  const { state } = useStudy();
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState(group);
  const [tab, setTab] = useState<"lessons" | "glossary">("lessons");
  const groups = Array.from(new Set(sections.map((s) => s.group)));
  const filtered = sections
    .filter((s) => !activeGroup || s.group === activeGroup)
    .map((s) => ({
      ...s,
      lessons: s.lessons.filter((l) =>
        `${l.title} ${l.hook} ${l.terms.map((t) => t.word).join(" ")}`
          .toLocaleLowerCase("fi")
          .includes(search.toLocaleLowerCase("fi")),
      ),
    }))
    .filter((s) => s.lessons.length);
  return (
    <>
      <PageHeading eyebrow="OPPIMISPOLKU" title="Ymmärrä kokonaisuus.">
        <span className="pill">13 osiota · {lessons.length} oppituntia</span>
      </PageHeading>
      <p className="page-intro">
        Kaikki kokeen ydinsisällöt omassa tahdissasi. Et tarvitse oppikirjaa
        aloittaaksesi.
      </p>
      <div className="course-tools">
        <div className="segmented">
          <button
            aria-pressed={tab === "lessons"}
            onClick={() => setTab("lessons")}
          >
            Oppitunnit
          </button>
          <button
            aria-pressed={tab === "glossary"}
            onClick={() => setTab("glossary")}
          >
            Sanasto · {glossary.length}
          </button>
        </div>
        <label className="search-field">
          <Search size={18} />
          <input
            aria-label="Hae oppituntia tai käsitettä"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Hae aihetta tai käsitettä…"
          />
        </label>
      </div>
      {tab === "lessons" ? (
        <>
          <div className="filter-chips" aria-label="Aiheryhmä">
            {["", ...groups].map((g) => (
              <button
                key={g}
                aria-pressed={g === activeGroup}
                onClick={() => setActiveGroup(g)}
              >
                {g || "Kaikki aiheet"}
              </button>
            ))}
          </div>
          <div className="course-sections">
            {filtered.map((s, i) => {
              const completed = s.lessons.filter(
                (l) => state.objectives[l.id]?.completedAt,
              ).length;
              return (
                <section className="course-section card" key={s.id}>
                  <div className="course-section-header">
                    <span className={`section-number ${s.color}`}>{s.id}</span>
                    <div>
                      <span className="eyebrow">{s.group}</span>
                      <h2>{s.title}</h2>
                      <p>{s.description}</p>
                    </div>
                    <div className="section-progress">
                      <span>
                        {completed} / {s.lessons.length} läpikäyty
                      </span>
                      <ProgressBar
                        value={(completed / s.lessons.length) * 100}
                        label={`${s.title}, läpikäydyt oppitunnit`}
                      />
                    </div>
                  </div>
                  <div className="lesson-list">
                    {s.lessons.map((l, j) => (
                      <a
                        key={l.id}
                        href={`#/lesson/${l.id}`}
                        className="lesson-row"
                      >
                        <span
                          className={`lesson-index ${mastery(state.objectives[l.id])}`}
                        >
                          {String(j + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <strong>{l.title}</strong>
                          <span>
                            noin {l.minutes} min · Kirjan s.{" "}
                            {l.source.book.join("–")}
                          </span>
                        </div>
                        <StatusPill objective={state.objectives[l.id]} />
                        <ArrowRight size={18} />
                      </a>
                    ))}
                  </div>
                  <span className="sr-only">Osio {i + 1}</span>
                </section>
              );
            })}
          </div>
          {!filtered.length && (
            <EmptyState
              icon={<Search />}
              title="Ei osumia"
              action={
                <button
                  className="button secondary"
                  onClick={() => {
                    setSearch("");
                    setActiveGroup("");
                  }}
                >
                  Tyhjennä haku
                </button>
              }
            >
              Kokeile toista käsitettä tai näytä kaikki aiheet.
            </EmptyState>
          )}
        </>
      ) : (
        <div className="glossary-grid">
          {glossary
            .filter((t) =>
              `${t.word} ${t.definition}`
                .toLocaleLowerCase("fi")
                .includes(search.toLocaleLowerCase("fi")),
            )
            .map((t) => (
              <article key={t.word} className="card glossary-term">
                <h2>{t.word}</h2>
                <p>{t.definition}</p>
                <a className="text-link" href={`#/lesson/${t.lessonId}`}>
                  Avaa oppitunti
                  <BookOpen size={15} />
                </a>
              </article>
            ))}
        </div>
      )}
    </>
  );
}
