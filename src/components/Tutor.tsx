import { useState } from "react";
import { BookOpen } from "lucide-react";
import { lessons, sections } from "../content";
import { AiAssistant } from "./AiAssistant";
import { PageHeading } from "./ui";
export function Tutor() {
  const [lessonId, setLessonId] = useState(lessons[0].id);
  const [answer, setAnswer] = useState("");
  const lesson = lessons.find((l) => l.id === lessonId)!;
  return (
    <>
      <PageHeading eyebrow="AI-OPETTAJA" title="Kysy. Pohdi. Oivalla." />
      <p className="page-intro">
        Selityksiä, yksi vihje kerrallaan ja palautetta perusteluista. Opettaja
        käyttää valitsemasi oppitunnin kuratoitua sisältöä.
      </p>
      <div className="tutor-layout">
        <aside className="card tutor-context">
          <BookOpen size={25} />
          <h2>Mitä opiskelet?</h2>
          <label htmlFor="tutor-lesson">Valitse oppitunti</label>
          <select
            id="tutor-lesson"
            value={lessonId}
            onChange={(e) => {
              setLessonId(e.target.value);
              setAnswer("");
            }}
          >
            {sections.map((s) => (
              <optgroup key={s.id} label={`${s.id} ${s.title}`}>
                {s.lessons.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <p className="small muted">
            Kirjan s. {lesson.source.book.join("–")} · PDF{" "}
            {lesson.source.pdf.join("–")}. AI:lle lähetetään itse kirjoitettu
            oppitunti, ei alkuperäistä PDF:ää.
          </p>
          <div className="divider" />
          <h3>Harjoittele omaa vastausta</h3>
          <p className="small">{lesson.application.prompt}</p>
          <label htmlFor="tutor-answer">Vastaus arviointitilaan</label>
          <textarea
            id="tutor-answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={6}
            maxLength={4000}
          />
          <p className="small muted">
            Tämän avoimen harjoittelutilan palaute ei päivitä hallintaa.
            Itsenäinen sovellus tehdään oppitunnin sisällä.
          </p>
          <a className="text-link" href={`#/lesson/${lesson.id}`}>
            Avaa oppitunti →
          </a>
        </aside>
        <AiAssistant key={lessonId} lessonId={lessonId} answer={answer} />
      </div>
    </>
  );
}
