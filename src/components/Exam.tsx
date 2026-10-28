import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Flag,
  Target,
} from "lucide-react";
import { commandVerbs, sections } from "../content";
import { makeExam } from "../content/exams";
import { useStudy } from "../lib/store";
import type { ExamSession } from "../lib/storage";
import { AiAssistant } from "./AiAssistant";
import { SelfRubric } from "./Assessment";
import { WrittenFeedback } from "./WrittenFeedback";
import { ButtonLink, Notice, PageHeading, ProgressBar } from "./ui";
export function Exam() {
  const { state, setState } = useStudy();
  const [index, setIndex] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [confirmFinish, setConfirmFinish] = useState(false);
  const [showResults, setShowResults] = useState<string | null>(null);
  const finishDialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (confirmFinish) finishDialog.current?.showModal();
    else finishDialog.current?.close();
  }, [confirmFinish]);
  const session = state.activeExam;
  const questions = session ? makeExam(session.minutes, session.seed) : [];
  const remaining = session
    ? Math.max(0, session.startedAt + session.minutes * 60_000 - now)
    : 0;
  function finish() {
    if (!session) return;
    setState((s) => {
      if (!s.activeExam || s.activeExam.id !== session.id) return s;
      const done = { ...s.activeExam, finishedAt: Date.now() };
      return {
        ...s,
        activeExam: undefined,
        exams: [done, ...s.exams].slice(0, 20),
      };
    });
    setShowResults(session.id);
    setConfirmFinish(false);
    setIndex(0);
  }
  const examId = session?.id;
  const deadline = session
    ? session.startedAt + session.minutes * 60_000
    : undefined;
  useEffect(() => {
    if (!examId || !deadline) return;
    const tick = () => {
      const time = Date.now();
      setNow(time);
      if (time >= deadline) {
        setState((s) =>
          s.activeExam?.id === examId
            ? {
                ...s,
                activeExam: undefined,
                exams: [
                  { ...s.activeExam, finishedAt: time },
                  ...s.exams,
                ].slice(0, 20),
              }
            : s,
        );
        setShowResults(examId);
        setConfirmFinish(false);
        setIndex(0);
      }
    };
    const first = setTimeout(tick, 0);
    const interval = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, [examId, deadline, setState]);
  function start(minutes: 15 | 40) {
    // eslint-disable-next-line react-hooks/purity -- Called only by the preset click handler to start the real deadline.
    const seed = Date.now();
    const next: ExamSession = {
      id: `exam-${seed}`,
      minutes,
      seed,
      startedAt: seed,
      answers: {},
      selfScores: {},
      aiScores: {},
    };
    setNow(seed);
    setIndex(0);
    setShowResults(null);
    setState((s) => ({ ...s, activeExam: next }));
  }
  if (session) {
    const q = questions[Math.min(index, questions.length - 1)];
    const answer = session.answers[q.id] ?? "";
    const answered = questions.filter(
      (q) => !!session.answers[q.id]?.trim(),
    ).length;
    const setAnswer = (value: string) =>
      setState((s) =>
        s.activeExam?.id === session.id
          ? {
              ...s,
              activeExam: {
                ...s.activeExam,
                answers: { ...s.activeExam.answers, [q.id]: value },
              },
            }
          : s,
      );
    return (
      <div className="exam-player">
        <div className="exam-top">
          <span className="eyebrow">HARJOITUSKOE · {session.minutes} MIN</span>
          <span
            className={`exam-timer ${remaining < 60_000 ? "urgent" : ""}`}
            role="timer"
            aria-label="Aikaa jäljellä"
          >
            <Clock3 size={17} />
            {String(Math.floor(remaining / 60_000)).padStart(2, "0")}:
            {String(Math.floor((remaining % 60_000) / 1000)).padStart(2, "0")}
          </span>
        </div>
        <h1 tabIndex={-1}>Ajattele rauhassa. Perustele selkeästi.</h1>
        <div className="exam-progress">
          <span>
            {answered} / {questions.length} vastattu
          </span>
          <ProgressBar
            value={(answered / questions.length) * 100}
            label="Kokeen vastatut tehtävät"
          />
        </div>
        <nav className="question-nav" aria-label="Kokeen tehtävät">
          {questions.map((q, i) => (
            <button
              key={q.id}
              aria-label={`Tehtävä ${i + 1}${session.answers[q.id]?.trim() ? ", vastattu" : ""}`}
              aria-current={i === index ? "step" : undefined}
              className={`${i === index ? "current" : ""} ${session.answers[q.id]?.trim() ? "answered" : ""}`}
              onClick={() => setIndex(i)}
            >
              {i + 1}
            </button>
          ))}
        </nav>
        <section className="card exam-question">
          <span className="eyebrow">
            {q.sectionId} ·{" "}
            {q.kind === "choice" ? "VALITSE YKSI" : "KIRJOITA JA PERUSTELE"} ·
            TEHTÄVÄ {index + 1}
          </span>
          <h2>
            {q.kind === "choice" ? q.item.choice.prompt : q.item.written.prompt}
          </h2>
          {q.kind === "choice" ? (
            <fieldset className="choice-options">
              <legend className="sr-only">Valitse vastaus</legend>
              {q.item.choice.options.map((o, i) => (
                <label
                  className={`choice-option ${answer === String(i) ? "selected" : ""}`}
                  key={o}
                >
                  <input
                    type="radio"
                    name={q.id}
                    checked={answer === String(i)}
                    onChange={() => setAnswer(String(i))}
                  />
                  <span className="option-letter" aria-hidden="true">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{o}</span>
                </label>
              ))}
            </fieldset>
          ) : (
            <>
              <label htmlFor="exam-answer">Oma koevastauksesi</label>
              <textarea
                id="exam-answer"
                maxLength={4000}
                rows={9}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Määrittele käsite, selitä mekanismi ja sovella tilanteeseen…"
              />
              <span className="char-count">{answer.length}/4000</span>
            </>
          )}
          <div className="exam-question-footer">
            <button
              className="button secondary"
              disabled={index === 0}
              onClick={() => setIndex((i) => i - 1)}
            >
              <ArrowLeft size={17} />
              Edellinen
            </button>
            {index < questions.length - 1 ? (
              <button className="button" onClick={() => setIndex((i) => i + 1)}>
                Seuraava
                <ArrowRight size={17} />
              </button>
            ) : (
              <button className="button" onClick={() => setConfirmFinish(true)}>
                <Flag size={17} />
                Palauta koe
              </button>
            )}
          </div>
        </section>
        <div className="exam-under">
          <p className="small muted">
            Vastaukset tallentuvat tälle laitteelle. Ajastin jatkuu myös sivun
            ollessa suljettuna.
          </p>
          <button
            className="text-button"
            onClick={() => setConfirmFinish(true)}
          >
            Palauta koe nyt
          </button>
        </div>
        {confirmFinish && (
          <dialog
            ref={finishDialog}
            onCancel={() => setConfirmFinish(false)}
            aria-labelledby="finish-title"
          >
            <div className="dialog-content">
              <h2 id="finish-title">Palautetaanko koe?</h2>
              <p>
                {answered} / {questions.length} tehtävään on vastattu.
                Palautuksen jälkeen vastauksia ei muuteta.
              </p>
              <div className="assessment-options">
                <button className="button" onClick={finish}>
                  Palauta ja näytä palaute
                </button>
                <button
                  className="button secondary"
                  autoFocus
                  onClick={() => setConfirmFinish(false)}
                >
                  Jatka koetta
                </button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    );
  }
  const result = showResults
    ? state.exams.find((e) => e.id === showResults)
    : undefined;
  if (result)
    return (
      <ExamResult
        key={result.id}
        exam={result}
        onClose={() => setShowResults(null)}
      />
    );
  return (
    <>
      <PageHeading
        eyebrow="HARJOITTELE KOETILANNETTA"
        title="Näytä, mitä osaat jo."
      />
      <p className="page-intro">
        Uusia soveltavia tehtäviä kaikista 13 osiosta. Vastaa ensin ilman apua,
        tutki palaute vasta palautuksen jälkeen.
      </p>
      <div className="exam-presets">
        {(
          [
            {
              min: 15,
              label: "Pieni tilannekatsaus",
              description:
                "13 tehtävää: 9 valintaa ja 4 kirjoitettavaa vastausta.",
              icon: Clock3,
            },
            {
              min: 40,
              label: "Koko koeharjoitus",
              description:
                "26 tehtävää: 13 valintaa ja 13 kirjoitettavaa vastausta.",
              icon: FileText,
            },
          ] as const
        ).map((x) => (
          <article key={x.min} className="card exam-preset">
            <span className={`icon-square ${x.min === 15 ? "lime" : "lilac"}`}>
              <x.icon size={26} />
            </span>
            <span className="preset-time" aria-hidden="true">
              {x.min}
              <small>min</small>
            </span>
            <h2>{x.label}</h2>
            <p>{x.description}</p>
            <ul>
              <li>
                <CheckCircle2 size={16} />
                Kaikki 13 aihealuetta
              </li>
              <li>
                <CheckCircle2 size={16} />
                Tallennus ja seinäkelloon sidottu ajastin
              </li>
              <li>
                <CheckCircle2 size={16} />
                Oma kertauslista tuloksista
              </li>
            </ul>
            <button className="button" onClick={() => start(x.min)}>
              Aloita {x.min} minuutin koe
              <ArrowRight size={17} />
            </button>
          </article>
        ))}
      </div>
      <details className="exam-verbs card">
        <summary>Mitä tehtävän käskysana pyytää?</summary>
        <dl>
          {commandVerbs.map((v) => (
            <div key={v.word}>
              <dt>{v.word}</dt>
              <dd>{v.definition}</dd>
            </div>
          ))}
        </dl>
      </details>
      <Notice>
        Valintatehtävät pisteytetään automaattisesti. Kirjoitetut vastaukset
        arvioit itse rubriikilla tai lähetät erikseen AI:lle suostumuksella.
        Itsearvio ei ole objektiivinen koepistemäärä.
      </Notice>
      {state.exams.length > 0 && (
        <section>
          <div className="section-heading">
            <h2>Aiemmat harjoitukset</h2>
            <span className="small muted">Viimeiset 20 säilytetään</span>
          </div>
          {state.exams.map((e) => (
            <button
              className="lesson-row card"
              key={e.id}
              onClick={() => setShowResults(e.id)}
            >
              <span className="icon-square lilac">
                <FileText size={20} />
              </span>
              <div>
                <strong>{e.minutes} minuutin harjoitus</strong>
                <span>{new Date(e.startedAt).toLocaleString("fi-FI")}</span>
              </div>
              <span>Näytä palaute →</span>
            </button>
          ))}
        </section>
      )}
    </>
  );
}
function ExamResult({
  exam,
  onClose,
}: {
  exam: ExamSession;
  onClose: () => void;
}) {
  const { setState } = useStudy();
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [aiId, setAiId] = useState<string | null>(null);
  const questions = makeExam(exam.minutes, exam.seed);
  const choices = questions.filter((q) => q.kind === "choice");
  const written = questions.filter((q) => q.kind === "written");
  const correct = choices.filter(
    (q) => exam.answers[q.id] === String(q.item.choice.correct),
  ).length;
  const gaps = questions.filter((q) =>
    q.kind === "choice"
      ? exam.answers[q.id] !== String(q.item.choice.correct)
      : (exam.aiScores[q.id]?.score ?? exam.selfScores[q.id] ?? -1) < 3,
  );
  const updateResult = (fn: (e: ExamSession) => ExamSession) =>
    setState((s) => ({
      ...s,
      exams: s.exams.map((e) => (e.id === exam.id ? fn(e) : e)),
    }));
  return (
    <>
      <PageHeading
        eyebrow="HARJOITUSKOKEEN PALAUTE"
        title="Tässä on seuraava suuntasi."
      >
        <button className="button secondary" onClick={onClose}>
          Koevalikko
        </button>
      </PageHeading>
      <div className="result-stats">
        <div className="card">
          <span className="eyebrow">AUTOMAATTISESTI TARKISTETTU</span>
          <strong>
            {correct}
            <small> / {choices.length}</small>
          </strong>
          <p>Valintatehtävää oikein</p>
        </div>
        <div className="card">
          <span className="eyebrow">KIRJOITETUT VASTAUKSET</span>
          <strong>
            {
              written.filter(
                (q) =>
                  exam.aiScores[q.id] || exam.selfScores[q.id] !== undefined,
              ).length
            }
            <small> / {written.length}</small>
          </strong>
          <p>Arvioitu · {Object.keys(exam.aiScores).length} AI-arviota</p>
        </div>
      </div>
      <Notice>
        Valintapisteet ja kirjoitettujen vastausten omat arviot esitetään
        erikseen. Tästä ei muodosteta virallista koearvosanaa. Yhden kokeen
        perusteella ei päivitetä kaikkien osion tavoitteiden hallintaa.
      </Notice>
      <div className="section-heading">
        <h2>
          <Target size={22} /> Vahvista seuraavaksi
        </h2>
      </div>
      {gaps.length ? (
        <div className="gap-list">
          {Array.from(new Set(gaps.map((q) => q.sectionId))).map((id) => (
            <div key={id} className="gap-row">
              <div>
                <strong>
                  {id} · {sections.find((s) => s.id === id)?.title}
                </strong>
                <p>
                  {gaps
                    .filter((q) => q.sectionId === id)
                    .some(
                      (q) =>
                        q.kind === "written" &&
                        exam.selfScores[q.id] === undefined &&
                        !exam.aiScores[q.id],
                    )
                    ? "Kirjoitettu vastaus odottaa arviota."
                    : "Vastauksessa jäi vahvistettavaa."}
                </p>
              </div>
              <ButtonLink
                href={`#/course?group=${encodeURIComponent(sections.find((s) => s.id === id)!.group)}`}
                secondary
              >
                Kertaa osio
              </ButtonLink>
            </div>
          ))}
        </div>
      ) : (
        <Notice>
          Kaikki tämän kokeen tarkistetut ja arvioidut tehtävät sujuivat
          vahvasti. Palaa myöhemmin viivästettyyn kertaukseen.
        </Notice>
      )}
      <div className="section-heading">
        <h2>Vastaukset ja perustelut</h2>
      </div>
      <div className="exam-answer-list">
        {questions.map((q, i) => (
          <section className="card result-question" key={q.id}>
            <span className="eyebrow">
              TEHTÄVÄ {i + 1} · {q.sectionId}
            </span>
            <h3>
              {q.kind === "choice"
                ? q.item.choice.prompt
                : q.item.written.prompt}
            </h3>
            <div className="locked-answer">
              <strong>Oma vastaus</strong>
              <p>
                {q.kind === "choice"
                  ? (q.item.choice.options[Number(exam.answers[q.id] ?? -1)] ??
                    "Ei vastausta")
                  : exam.answers[q.id] || "Ei vastausta"}
              </p>
            </div>
            {q.kind === "choice" ? (
              <div
                className={`answer-feedback ${exam.answers[q.id] === String(q.item.choice.correct) ? "correct" : "incorrect"}`}
              >
                <div>
                  <strong>
                    {exam.answers[q.id] === String(q.item.choice.correct)
                      ? "Oikein"
                      : `Oikea vastaus: ${q.item.choice.options[q.item.choice.correct]}`}
                  </strong>
                  <p>{q.item.choice.explanation}</p>
                </div>
              </div>
            ) : (
              <>
                <WrittenFeedback
                  task={q.item.written}
                  answer={exam.answers[q.id] ?? ""}
                  announce={false}
                />
                <div className="assessment-options">
                  <button
                    className="button secondary small-button"
                    onClick={() => setReviewId(reviewId === q.id ? null : q.id)}
                  >
                    Avaa oman arvion rubriikki
                  </button>
                  <button
                    className="button secondary small-button"
                    disabled={(exam.answers[q.id]?.trim().length ?? 0) < 20}
                    onClick={() => setAiId(aiId === q.id ? null : q.id)}
                  >
                    Pyydä AI-arvio
                  </button>
                  {exam.aiScores[q.id] ? (
                    <span className="score-tag">
                      AI {exam.aiScores[q.id].score}/4
                    </span>
                  ) : exam.selfScores[q.id] !== undefined ? (
                    <span className="score-tag">
                      Oma arvio {exam.selfScores[q.id]}/4
                    </span>
                  ) : (
                    <span className="small muted">Vielä arvioimatta</span>
                  )}
                </div>
                {exam.aiScores[q.id] && <p>{exam.aiScores[q.id].feedback}</p>}
                {reviewId === q.id && (
                  <SelfRubric
                    task={q.item.written}
                    onScore={(score) =>
                      updateResult((e) => ({
                        ...e,
                        selfScores: { ...e.selfScores, [q.id]: score },
                      }))
                    }
                  />
                )}{" "}
                {aiId === q.id && (
                  <AiAssistant
                    lessonId={q.lessonId}
                    task="exam"
                    answer={exam.answers[q.id]}
                    initialMode="grade"
                    onGraded={(r) => {
                      if (r.score !== null)
                        updateResult((e) => ({
                          ...e,
                          aiScores: {
                            ...e.aiScores,
                            [q.id]: { score: r.score!, feedback: r.reply },
                          },
                        }));
                    }}
                  />
                )}
              </>
            )}
          </section>
        ))}
      </div>
    </>
  );
}
