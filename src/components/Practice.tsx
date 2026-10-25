import { useState } from "react";
import { CheckCircle2, RotateCcw } from "lucide-react";
import { lessons, lessonById } from "../content";
import type { Lesson } from "../content/types";
import { useStudy } from "../lib/store";
import { addActivity } from "../lib/storage";
import { finishFocusItem } from "../lib/focus";
import {
  DAY,
  emptyObjective,
  recordChoice,
  recordRecall,
  reviewQueue,
} from "../lib/learning";
import { MultipleChoice, SelfRubric } from "./Assessment";
import { ButtonLink, EmptyState, Notice, PageHeading, StatusPill } from "./ui";
export function Practice({ initialLesson }: { initialLesson?: string }) {
  const { state } = useStudy();
  const due = reviewQueue(state.objectives);
  const [chosen, setChosen] = useState<string | null>(
    initialLesson && Object.hasOwn(lessonById, initialLesson)
      ? initialLesson
      : null,
  );
  const [showAll, setShowAll] = useState(false);
  const available = showAll
    ? lessons.filter((l) => state.objectives[l.id]?.seenAt)
    : due;
  const lesson = chosen ? lessonById[chosen] : undefined;
  return (
    <>
      <PageHeading
        eyebrow="MUISTI VAHVISTUU PALAAMALLA"
        title="Pieni kertaus. Pysyvämpi jälki."
      >
        <span className="pill">{due.length} ajankohtaista</span>
      </PageHeading>
      <p className="page-intro">
        Aloita muistista. Aiheet vuorottelevat, ja virheellisiin vastauksiin
        palataan nopeammin.
      </p>
      {lesson ? (
        <Review
          key={lesson.id}
          lesson={lesson}
          onDone={() => setChosen(null)}
        />
      ) : (
        <>
          <div className="review-banner">
            <RotateCcw size={27} />
            <div>
              <h2>Muistaminen on eri asia kuin tunnistaminen.</h2>
              <p>
                Kertaat ensin omin sanoin ja vasta sitten tarkistat. Vähintään
                vuorokauden viiveellä tehty muistelu voi vahvistaa hallintaa,
                kun myös tarkistetut tehtävät onnistuvat.
              </p>
            </div>
          </div>
          <div className="filter-chips">
            <button aria-pressed={!showAll} onClick={() => setShowAll(false)}>
              Ajankohtaiset
            </button>
            <button aria-pressed={showAll} onClick={() => setShowAll(true)}>
              Kaikki nähdyt aiheet
            </button>
          </div>
          {available.length ? (
            <div className="review-list">
              {available.map((l) => (
                <button
                  key={l.id}
                  className="lesson-row card"
                  onClick={() => setChosen(l.id)}
                >
                  <span className="icon-square peach">
                    <RotateCcw size={20} />
                  </span>
                  <div>
                    <strong>{l.title}</strong>
                    <span>
                      {state.objectives[l.id].mistakes
                        ? `${state.objectives[l.id].mistakes} aiempaa virhettä · vahvistetaan eroa`
                        : "Palauta mieleen omin sanoin"}
                    </span>
                  </div>
                  <StatusPill objective={state.objectives[l.id]} />
                  <span aria-hidden="true">→</span>
                </button>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<CheckCircle2 size={32} />}
              title={
                showAll
                  ? "Aloitetaan yhdestä aiheesta."
                  : "Kertausjono on nyt rauhallinen."
              }
              action={
                <ButtonLink href="#/course">Avaa oppimispolku</ButtonLink>
              }
            >
              {showAll
                ? "Käy ensin läpi oppitunti, niin voit palata siihen täällä."
                : "Ajastetut kertaukset näkyvät täällä, kun niiden aika tulee. Voit myös valita kaikki nähdyt aiheet."}
            </EmptyState>
          )}
        </>
      )}
    </>
  );
}
function Review({ lesson, onDone }: { lesson: Lesson; onDone: () => void }) {
  const { state, setState } = useStudy();
  const [answer, setAnswer] = useState("");
  const [stage, setStage] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [startedAt] = useState(() => Date.now());
  const objective = state.objectives[lesson.id] ?? emptyObjective();
  const delayed = !!objective.seenAt && startedAt - objective.seenAt >= DAY;
  const question = lesson.questions[stage - 1];
  const finish = (value: number) => {
    setScore(value);
    setState((s) => {
      const o = s.objectives[lesson.id] ?? emptyObjective();
      const updated = delayed
        ? recordRecall(o, value, "self", Date.now())
        : {
            ...o,
            dueAt:
              value >= 3
                ? Math.max(
                    Date.now() + 10 * 60_000,
                    (o.seenAt ?? Date.now()) + DAY,
                  )
                : Date.now() + 10 * 60_000,
          };
      return {
        ...s,
        objectives: { ...s.objectives, [lesson.id]: updated },
        activity: addActivity(s, "reviews"),
        focusPlan: finishFocusItem(s, lesson.id, "review"),
      };
    });
  };
  return (
    <section className="review-player card">
      <div className="lesson-topline">
        <span className="eyebrow">
          {lesson.sectionId} ·{" "}
          {delayed ? "VIIVÄSTETTY KERTAUS" : "VAHVISTAVA HARJOITUS"}
        </span>
        <button className="text-button" onClick={onDone}>
          Sulje kertaus
        </button>
      </div>
      <h2>{lesson.title}</h2>
      {stage === 0 && (
        <>
          <h3>{lesson.recall.prompt}</h3>
          <p className="muted">
            Kirjoita muistista ennen mallin tai oppitunnin avaamista.
          </p>
          <label htmlFor="review-answer">Muistinvarainen vastauksesi</label>
          <textarea
            id="review-answer"
            maxLength={4000}
            rows={6}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button
            className="button"
            disabled={answer.trim().length < 10}
            onClick={() => setStage(1)}
          >
            Lukitse yritys ja jatka
          </button>
        </>
      )}
      {(stage === 1 || stage === 2) && (
        <MultipleChoice
          key={question.id}
          question={question}
          rescue={objective.mistakes >= 2}
          onAnswer={(choice, confidence) =>
            setState((s) => {
              const o = s.objectives[lesson.id] ?? emptyObjective();
              const last = [...o.evidence]
                .reverse()
                .find((e) => e.questionId === question.id);
              const independent = !last || Date.now() - last.at >= DAY;
              return {
                ...s,
                objectives: {
                  ...s.objectives,
                  [lesson.id]: recordChoice(o, {
                    questionId: question.id,
                    correct: choice === question.correct,
                    at: Date.now(),
                    confidence,
                    independent,
                  }),
                },
              };
            })
          }
          onNext={() => setStage(stage + 1)}
          nextLabel={
            stage === 1 ? "Toinen tarkistus" : "Arvioi muistinvarainen vastaus"
          }
        />
      )}
      {stage === 3 && (
        <>
          <div className="locked-answer">
            <strong>Oma muistinvarainen yrityksesi</strong>
            <p>{answer}</p>
          </div>
          {objective.mistakes >= 2 && (
            <div className="example-box">
              <RotateCcw />
              <div>
                <h3>Kohdennettu muistivihje</h3>
                <p>{lesson.diagram.steps.join(" → ")}</p>
                <p>{lesson.example}</p>
              </div>
            </div>
          )}
          <SelfRubric task={lesson.recall} onScore={finish} />
          {!delayed && (
            <Notice>
              Ensimmäisestä näkemisestä on alle vuorokausi. Tämä harjoitus ei
              yksin varmista hallintaa; seuraava riippumaton muistelu tehdään
              aikaisintaan vuorokauden kuluttua.
            </Notice>
          )}
          {score !== null && (
            <>
              <Notice>
                Oma arvio {score}/4 tallennettu.{" "}
                {score < 3
                  ? "Kerrataan pian uudelleen."
                  : "Seuraava kertaus ajastettiin."}
              </Notice>
              <button className="button" onClick={onDone}>
                Palaa kertausjonoon →
              </button>
            </>
          )}
        </>
      )}
    </section>
  );
}
