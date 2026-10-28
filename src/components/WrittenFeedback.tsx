import { Lightbulb, ScanText } from "lucide-react";
import type { WrittenTask } from "../content/types";
import { analyzeWrittenAnswer } from "../lib/written-feedback";

/**
 * Immediate offline response to the student's actual written text.
 * No fake AI label, no fabricated correctness judgment or score.
 */
export function WrittenFeedback({
  answer,
  task,
  announce = true,
}: {
  answer: string;
  task: WrittenTask;
  announce?: boolean;
}) {
  const result = analyzeWrittenAnswer(answer, task);
  return (
    <section
      className="written-feedback"
      aria-label="Palaute vastauksestasi"
      role={announce ? "status" : "region"}
    >
      <div className="written-feedback-heading">
        <span className="written-feedback-icon" aria-hidden="true">
          <ScanText size={19} />
        </span>
        <div>
          <span className="eyebrow">VASTAUKSEN TARKISTUS</span>
          <h3>Palaute vastauksestasi</h3>
        </div>
      </div>
      <p className="written-feedback-intro">{result.introduction}</p>
      {result.sharedTerms.length > 0 && (
        <div className="written-feedback-match">
          <strong>Samoja tai samankaltaisia sanoja mallivastauksessa</strong>
          <div className="written-feedback-tags">
            {result.sharedTerms.map((term) => (
              <span key={term}>{term}</span>
            ))}
          </div>
          <p>
            Nämä ovat sanallisia osumia, eivät merkki oikeasta perustelusta.
            Sama asia voi olla ilmaistu myös eri sanoilla.
          </p>
        </div>
      )}
      <div className="written-feedback-next">
        <Lightbulb size={19} aria-hidden="true" />
        <p>
          <strong>Seuraava askel:</strong> {result.nextStep}
        </p>
      </div>
      <p className="written-feedback-disclaimer">
        Tämä on automaattista offline-harjoituspalautetta, ei opettajan tai AI:n
        tekemä sisältöarvio eikä arvosana. Vertaa perustelut mallivastaukseen.
      </p>
    </section>
  );
}
