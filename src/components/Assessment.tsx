import { useId, useState } from "react";
import { Check, CheckCircle2, XCircle } from "lucide-react";
import type { Question, WrittenTask } from "../content/types";
import type { Confidence } from "../lib/learning";
export function MultipleChoice({
  question,
  saved,
  onAnswer,
  onNext,
  nextLabel = "Jatka",
  rescue = false,
}: {
  question: Question;
  saved?: number;
  onAnswer: (choice: number, confidence: Confidence) => void;
  onNext: () => void;
  nextLabel?: string;
  rescue?: boolean;
}) {
  const [selected, setSelected] = useState<number | undefined>(saved);
  const [checked, setChecked] = useState(saved !== undefined);
  const [confidence, setConfidence] = useState<Confidence>("medium");
  const id = useId();
  return (
    <div className="assessment">
      <span className="eyebrow">
        {rescue ? "VIRHEESTÄ OIVALLUKSEEN" : "TARKISTA YMMÄRRYS"}
      </span>
      <h2>{question.prompt}</h2>
      <fieldset className="choice-options">
        <legend className="sr-only">Valitse yksi vastaus</legend>
        {question.options.map((option, i) => (
          <label
            key={option}
            className={`choice-option ${selected === i ? "selected" : ""} ${checked && i === question.correct ? "correct" : ""} ${checked && selected === i && i !== question.correct ? "incorrect" : ""}`}
          >
            <input
              type="radio"
              name={id}
              value={i}
              checked={selected === i}
              disabled={checked}
              onChange={() => setSelected(i)}
            />
            <span className="option-letter" aria-hidden="true">
              {String.fromCharCode(65 + i)}
            </span>
            <span>{option}</span>
            {checked && i === question.correct && <Check size={19} />}
          </label>
        ))}
      </fieldset>
      {!checked && (
        <fieldset className="confidence">
          <legend>Kuinka varma olet?</legend>
          {(
            [
              { id: "low", label: "Arvaan vähän" },
              { id: "medium", label: "Melko varma" },
              { id: "high", label: "Osaan perustella" },
            ] as const
          ).map((c) => (
            <label key={c.id}>
              <input
                type="radio"
                name={`${id}-confidence`}
                value={c.id}
                checked={confidence === c.id}
                onChange={() => setConfidence(c.id)}
              />
              {c.label}
            </label>
          ))}
        </fieldset>
      )}
      {checked ? (
        <>
          <div
            className={`answer-feedback ${selected === question.correct ? "correct" : "incorrect"}`}
          >
            {selected === question.correct ? <CheckCircle2 /> : <XCircle />}
            <div>
              <strong>
                {selected === question.correct
                  ? "Oikein. Huomaa myös perustelu."
                  : selected === -1
                    ? "Et vielä tiennyt – opitaan yhdessä."
                    : "Tämä oli hyvä kohta pysähtyä."}
              </strong>
              <p>{question.explanation}</p>
              {rescue && (
                <p className="small">
                  Palauta mieleen juuri tämä ero ennen seuraavaa yritystä. Virhe
                  tihentää kertausta, se ei vähennä arvoasi.
                </p>
              )}
            </div>
          </div>
          <button className="button" onClick={onNext}>
            {nextLabel} →
          </button>
        </>
      ) : (
        <>
          <button
            className="button"
            disabled={selected === undefined}
            onClick={() => {
              if (selected !== undefined) {
                setChecked(true);
                onAnswer(selected, confidence);
              }
            }}
          >
            Tarkista vastaus
          </button>
          <button
            className="button secondary"
            onClick={() => {
              setSelected(-1);
              setChecked(true);
              onAnswer(-1, "low");
            }}
          >
            En osaa vielä – katso perustelu
          </button>
        </>
      )}
    </div>
  );
}
export function SelfRubric({
  task,
  onScore,
  label = "Oma arvio · ei AI-arvio",
}: {
  task: WrittenTask;
  onScore?: (score: number) => void;
  label?: string;
}) {
  const [checks, setChecks] = useState<boolean[]>(task.rubric.map(() => false));
  const [saved, setSaved] = useState(false);
  return (
    <div className="self-rubric">
      <span className="eyebrow">{label}</span>
      <h3>Vertaa omaa vastaustasi.</h3>
      <p className="model-answer">{task.model}</p>
      <fieldset>
        <legend>Mitkä asiat löytyivät omasta vastauksestasi?</legend>
        {task.rubric.map((r, i) => (
          <label key={r}>
            <input
              type="checkbox"
              checked={checks[i]}
              disabled={saved}
              onChange={(e) =>
                setChecks((old) =>
                  old.map((v, j) => (j === i ? e.target.checked : v)),
                )
              }
            />
            {r}
          </label>
        ))}
      </fieldset>
      {onScore && (
        <>
          <button
            className="button secondary"
            disabled={saved}
            onClick={() => {
              setSaved(true);
              onScore(
                Math.round(
                  (checks.filter(Boolean).length / task.rubric.length) * 4,
                ),
              );
            }}
          >
            {saved ? "Oma arvio tallennettu" : "Tallenna oma arvio"}
          </button>
          <p className="small muted">
            Itse merkitty arvio kuvaa omaa käsitystäsi osaamisesta. Se ei ole
            objektiivinen koepistemäärä.
          </p>
        </>
      )}
    </div>
  );
}
