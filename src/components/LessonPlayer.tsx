import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { lessons, medicalNote } from "../content";
import type { Lesson } from "../content/types";
import { useStudy } from "../lib/store";
import { addActivity, type LessonDraft } from "../lib/storage";
import { emptyObjective, mastery, recordChoice } from "../lib/learning";
import { recordIndependentTransfer } from "../lib/ai-evidence";
import { finishFocusItem } from "../lib/focus";
import { hasAttempt, isUnsureAnswer } from "../lib/answer-flow";
import { navigate } from "../lib/hooks";
import { AiAssistant } from "./AiAssistant";
import { MultipleChoice, SelfRubric } from "./Assessment";
import { WrittenFeedback } from "./WrittenFeedback";
import { ButtonLink, Notice, ProgressBar, StatusPill } from "./ui";
const stages = [
  "Tilanne",
  "Ymmärrä",
  "Muista",
  "Harjoittele",
  "Sovella",
  "Oivallus",
];
const blankDraft = (): LessonDraft => ({
  stage: 0,
  recall: "",
  written: "",
  choiceIndex: 0,
  answers: {},
  recallSubmitted: false,
  writtenSubmitted: false,
  rubricViewed: false,
  helpUsed: false,
});
export function LessonPlayer({
  lesson,
  session,
}: {
  lesson: Lesson;
  session: boolean;
}) {
  const { state, setState } = useStudy();
  const draft = state.drafts[lesson.id] ?? blankDraft();
  const objective = state.objectives[lesson.id];
  const [showAI, setShowAI] = useState(false);
  const update = (patch: Partial<LessonDraft>) =>
    setState((s) => ({
      ...s,
      drafts: {
        ...s.drafts,
        [lesson.id]: { ...(s.drafts[lesson.id] ?? blankDraft()), ...patch },
      },
    }));
  useEffect(() => {
    setState((s) =>
      s.objectives[lesson.id]?.seenAt
        ? s
        : {
            ...s,
            objectives: {
              ...s.objectives,
              [lesson.id]: { ...emptyObjective(), seenAt: Date.now() },
            },
          },
    );
  }, [lesson.id, setState]);
  const nextStage = () => {
    update({ stage: draft.stage + 1 });
    window.scrollTo({ top: 0 });
  };
  const complete = () => {
    setState((s) => {
      const o = s.objectives[lesson.id] ?? {
        ...emptyObjective(),
        seenAt: Date.now(),
      };
      return {
        ...s,
        objectives: {
          ...s.objectives,
          [lesson.id]: {
            ...o,
            completedAt: o.completedAt ?? Date.now(),
            dueAt: o.dueAt ?? Date.now() + 86_400_000,
          },
        },
        activity: o.completedAt ? s.activity : addActivity(s, "lessons"),
        focusPlan: finishFocusItem(s, lesson.id, "lesson"),
        drafts: {
          ...s.drafts,
          [lesson.id]: { ...(s.drafts[lesson.id] ?? blankDraft()), stage: 5 },
        },
      };
    });
    window.scrollTo({ top: 0 });
  };
  const next = lessons[lessons.findIndex((l) => l.id === lesson.id) + 1];
  const stage = draft.stage;
  // A restored/older backup can contain index 2 although each lesson has
  // only two questions (indices 0 and 1). Always leave a working way forward.
  const choiceIndex = Math.min(
    Math.max(0, draft.choiceIndex),
    lesson.questions.length - 1,
  );
  return (
    <div className="lesson-player">
      <div className="lesson-topline">
        <a className="text-link" href={session ? "#/session" : "#/course"}>
          <ArrowLeft size={16} />
          {session ? "Päivän oma hetki" : "Oppimispolku"}
        </a>
        <StatusPill objective={objective} />
      </div>
      <div className="lesson-header">
        <p className="eyebrow">
          OSIO {lesson.sectionId} · NOIN {lesson.minutes} MIN
        </p>
        <h1 tabIndex={-1}>{lesson.title}</h1>
        <p className="source-ref">
          <BookOpen size={14} /> Oppikirjan s. {lesson.source.book.join("–")} ·
          PDF-sivut {lesson.source.pdf.join("–")}
        </p>
      </div>
      <ol className="lesson-stages">
        {stages.map((s, i) => (
          <li
            key={s}
            className={`${i === stage ? "current" : ""} ${i < stage ? "done" : ""}`}
            aria-current={i === stage ? "step" : undefined}
          >
            <span>{i < stage ? "✓" : i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
      <ProgressBar value={(stage / 5) * 100} label="Oppitunnin vaihe" />
      {lesson.sectionId.startsWith("8.") && (
        <details className="medical-note">
          <summary>
            Ensiavun toimituksellinen huomautus · tarkistettu{" "}
            {medicalNote.checkedAt}
          </summary>
          <p>{medicalNote.text}</p>
          <a href={medicalNote.sources[0][1]} target="_blank" rel="noreferrer">
            Tarkista SPR:n ajantasaiset ohjeet ↗
          </a>
        </details>
      )}
      <div className="lesson-paper card">
        {stage === 0 && (
          <div className="challenge-stage">
            <span className="icon-square lilac">
              <Lightbulb size={27} />
            </span>
            <p className="eyebrow">ALOITETAAN TILANTEESTA</p>
            <h2>{lesson.hook}</h2>
            <p>
              Pysähdy hetkeksi. Mitä ajattelet nyt? Seuraavaksi rakennat
              vastauksen askel kerrallaan.
            </p>
            <button className="button" onClick={nextStage}>
              Tutki, mistä on kyse
              <ArrowRight size={18} />
            </button>
          </div>
        )}
        {stage === 1 && (
          <div className="teach-stage">
            <span className="eyebrow">YMMÄRRÄ ENNEN MUISTAMISTA</span>
            <h2>{lesson.title}</h2>
            {lesson.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="teaching-diagram">
              <h3>{lesson.diagram.title}</h3>
              <ol>
                {lesson.diagram.steps.map((s, i) => (
                  <li key={s}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {s}
                    {i < lesson.diagram.steps.length - 1 && (
                      <ChevronRight size={18} />
                    )}
                  </li>
                ))}
              </ol>
            </div>
            <div className="example-box">
              <Lightbulb size={21} />
              <div>
                <h3>Näin se näkyy arjessa</h3>
                <p>{lesson.example}</p>
              </div>
            </div>
            <div className="lesson-terms">
              {lesson.terms.map((t) => (
                <div key={t.word}>
                  <h3>{t.word}</h3>
                  <p>{t.definition}</p>
                </div>
              ))}
            </div>
            <button className="button" onClick={nextStage}>
              Sulje teksti ja palauta mieleen
              <ArrowRight size={17} />
            </button>
          </div>
        )}
        {stage === 2 && (
          <div>
            <span className="eyebrow">ILMAN MALLIA, OMIN SANOIN</span>
            <h2>{lesson.recall.prompt}</h2>
            <p className="muted">
              Yritä ensin itse. Vasta kirjoittamisen jälkeen näet
              vertailuvastauksen.
            </p>
            <label htmlFor="recall-answer">Muistinvarainen vastauksesi</label>
            <textarea
              id="recall-answer"
              value={draft.recall}
              disabled={draft.recallSubmitted}
              maxLength={4000}
              rows={5}
              onChange={(e) => update({ recall: e.target.value })}
            />
            {!draft.recallSubmitted ? (
              <>
                <button
                  className="button"
                  disabled={!hasAttempt(draft.recall)}
                  onClick={() =>
                    update({
                      recallSubmitted: true,
                      helpUsed: draft.helpUsed || isUnsureAnswer(draft.recall),
                    })
                  }
                >
                  Tallenna oma yritys
                </button>
                <button
                  className="button secondary"
                  onClick={() =>
                    update({ recallSubmitted: true, helpUsed: true })
                  }
                >
                  En osaa vielä – näytä esimerkki
                </button>
              </>
            ) : (
              <>
                {(isUnsureAnswer(draft.recall) ||
                  !hasAttempt(draft.recall)) && (
                  <Notice>
                    Et vielä tiennyt vastausta – se on hyvä lähtökohta
                    oppimiselle. Lue vertailuvastaus, palaa tarvittaessa
                    opetukseen ja kokeile seuraavia tehtäviä. Tämä ei ole
                    osoitus hallinnasta.
                  </Notice>
                )}
                <SelfRubric task={lesson.recall} answer={draft.recall} />
                <Notice>
                  Tämä saman päivän muistelu harjoittaa osaamista. Hallinta
                  varmistetaan myöhemmin viivästetyllä kertauksella tai
                  itsenäisellä AI-arvioidulla sovelluksella.
                </Notice>
                <button className="button" onClick={nextStage}>
                  Harjoittele ymmärrystä
                  <ArrowRight size={17} />
                </button>
              </>
            )}
          </div>
        )}
        {stage === 3 && (
          <>
            <div className="question-counter">
              TEHTÄVÄ {choiceIndex + 1} / {lesson.questions.length}
            </div>
            {lesson.questions[choiceIndex] && (
              <MultipleChoice
                key={lesson.questions[choiceIndex].id}
                question={lesson.questions[choiceIndex]}
                saved={draft.answers[lesson.questions[choiceIndex].id]}
                rescue={(objective?.mistakes ?? 0) >= 2}
                onAnswer={(choice, confidence) => {
                  const q = lesson.questions[choiceIndex];
                  setState((s) => {
                    const d = s.drafts[lesson.id] ?? blankDraft();
                    const o = s.objectives[lesson.id] ?? {
                      ...emptyObjective(),
                      seenAt: Date.now(),
                    };
                    return {
                      ...s,
                      drafts: {
                        ...s.drafts,
                        [lesson.id]: {
                          ...d,
                          answers: { ...d.answers, [q.id]: choice },
                          helpUsed: d.helpUsed || choice === -1,
                        },
                      },
                      objectives: {
                        ...s.objectives,
                        [lesson.id]: recordChoice(o, {
                          questionId: q.id,
                          correct: choice === q.correct,
                          independent: !d.helpUsed && choice !== -1,
                          at: Date.now(),
                          confidence,
                        }),
                      },
                    };
                  });
                }}
                onNext={() =>
                  choiceIndex === 0 ? update({ choiceIndex: 1 }) : nextStage()
                }
                nextLabel={
                  choiceIndex === 0
                    ? "Seuraava tehtävä"
                    : "Sovella uuteen tilanteeseen"
                }
              />
            )}
          </>
        )}
        {stage === 4 && (
          <div>
            <span className="eyebrow">KOEVASTAUS SYNTYY PERUSTELUISTA</span>
            <h2>{lesson.application.prompt}</h2>
            <p className="muted">
              Vastaa ensin itsenäisesti. Kirjoita käsite, syy tai mekanismi ja
              tilanteeseen sopiva esimerkki. Käytä kuvitteellisia tietoja.
            </p>
            <label htmlFor="application-answer">
              Oma kirjoitettu vastauksesi
            </label>
            <textarea
              id="application-answer"
              value={draft.written}
              disabled={draft.writtenSubmitted}
              maxLength={4000}
              rows={7}
              onChange={(e) => update({ written: e.target.value })}
            />
            <span className="char-count">{draft.written.length}/4000</span>
            {!draft.writtenSubmitted ? (
              <>
                <button
                  className="button"
                  disabled={!hasAttempt(draft.written)}
                  onClick={() =>
                    update({
                      writtenSubmitted: true,
                      ...(isUnsureAnswer(draft.written)
                        ? { helpUsed: true, rubricViewed: true }
                        : {}),
                    })
                  }
                >
                  Lukitse oma vastaus
                </button>
                <button
                  className="button secondary"
                  onClick={() =>
                    update({
                      writtenSubmitted: true,
                      rubricViewed: true,
                      helpUsed: true,
                    })
                  }
                >
                  En osaa vielä – näytä mallivastaus
                </button>
              </>
            ) : (
              <>
                {(isUnsureAnswer(draft.written) ||
                  !hasAttempt(draft.written)) && (
                  <Notice>
                    Et tarvitse valmista vastausta jatkaaksesi. Tutki mallia,
                    vertaa käsitteitä ja palaa tähän aiheeseen kertauksessa.
                    Tästä ei kirjata onnistunutta koesuoritusta.
                  </Notice>
                )}
                <WrittenFeedback
                  answer={draft.written}
                  task={lesson.application}
                />
                <div className="assessment-options">
                  {!draft.rubricViewed && (
                    <button
                      className="button secondary"
                      onClick={() => update({ rubricViewed: true })}
                    >
                      Vertaa itse malliin
                    </button>
                  )}
                  {hasAttempt(draft.written) &&
                    !isUnsureAnswer(draft.written) &&
                    draft.written.trim().length >= 20 && (
                      <button
                        className="button secondary"
                        onClick={() => setShowAI((v) => !v)}
                      >
                        <Sparkles size={17} />
                        Pyydä AI-arvio
                      </button>
                    )}
                </div>
                {draft.rubricViewed && (
                  <SelfRubric task={lesson.application} />
                )}{" "}
                {draft.rubricViewed && (
                  <Notice>
                    Malli on nyt nähty. Tämän vastauksen myöhempi AI-arvio on
                    harjoituspalautetta; se ei vahvista itsenäistä hallintaa.
                  </Notice>
                )}
                {showAI && (
                  <AiAssistant
                    lessonId={lesson.id}
                    task="application"
                    answer={draft.written}
                    initialMode="grade"
                    onHelp={() => update({ helpUsed: true })}
                    onGraded={(response) => {
                      if (response.score !== null)
                        setState((current) =>
                          recordIndependentTransfer(
                            current,
                            lesson.id,
                            draft.written,
                            response.score!,
                          ),
                        );
                    }}
                  />
                )}
                <button className="button finish-button" onClick={complete}>
                  Valmis tältä erää
                  <CheckCircle2 size={18} />
                </button>
              </>
            )}
          </div>
        )}
        {stage === 5 && (
          <div className="summary-stage">
            <span className="summary-icon">
              <CheckCircle2 size={35} />
            </span>
            <span className="eyebrow">YKSI OIVALLUS LISÄÄ</span>
            <h2>Hyvin tehty. Anna tiedon asettua.</h2>
            <p>
              Oppitunti on käyty läpi. Osaamistila:{" "}
              <strong>
                {mastery(objective) === "mastered" ? "hallittu" : "harjoiteltu"}
              </strong>
              . Yksi onnistuminen ei vielä osoita pysyvää muistamista.
            </p>
            <div className="summary-facts">
              <div>
                <RotateCcw size={22} />
                <div>
                  <strong>Seuraava kertaus</strong>
                  <p>
                    {objective?.dueAt
                      ? new Date(objective.dueAt).toLocaleString("fi-FI", {
                          day: "numeric",
                          month: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Huomenna"}{" "}
                    · kertausjonossa
                  </p>
                </div>
              </div>
              <div>
                <BookOpen size={22} />
                <div>
                  <strong>Pidä nämä mielessä</strong>
                  <p>{lesson.terms.map((t) => t.word).join(" · ")}</p>
                </div>
              </div>
            </div>
            <div className="assessment-options">
              <ButtonLink
                href={
                  session
                    ? "#/session"
                    : next
                      ? `#/lesson/${next.id}`
                      : "#/progress"
                }
              >
                {session
                  ? "Palaa päivän polkuun"
                  : next
                    ? "Seuraava oppitunti"
                    : "Katso edistyminen"}
              </ButtonLink>
              <ButtonLink href="#/course" secondary>
                Oppimispolku
              </ButtonLink>
            </div>
            <button
              className="text-button"
              onClick={() => {
                update({ ...blankDraft(), stage: 1, helpUsed: true });
              }}
            >
              Lue ja harjoittele uudelleen
            </button>
          </div>
        )}
      </div>
      {stage > 0 && stage < 5 && (
        <div className="lesson-bottom">
          <button
            className="text-button"
            onClick={() => update({ stage: stage - 1 })}
          >
            <ArrowLeft size={15} /> Edellinen vaihe
          </button>
          <span>Vaihe {stage + 1} / 6 · tallentuu automaattisesti</span>
          <button className="text-button" onClick={() => navigate("/course")}>
            Jatka myöhemmin
          </button>
        </div>
      )}
    </div>
  );
}
