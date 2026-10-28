import { describe, it, expect } from "vitest";
import { analyzeWrittenAnswer } from "../src/lib/written-feedback";
import { lessons } from "../src/content";
import { examItems } from "../src/content/exams";

const recall = lessons[0].recall;

describe("transparent, syllabus-grounded offline written feedback", () => {
  it("responds specifically to missing, unsure, and short inputs", () => {
    const empty = analyzeWrittenAnswer(" ", recall);
    expect(empty.kind).toBe("empty");
    expect(empty.nextStep).toContain(recall.rubric[0]);
    const unsure = analyzeWrittenAnswer("En tiedä?", recall);
    expect(unsure.kind).toBe("unsure");
    expect(unsure.sharedTerms).toEqual([]);
    const brief = analyzeWrittenAnswer("Mielenterveys on voimavara.", recall);
    expect(brief.kind).toBe("brief");
    // "Voimavara" already appears, so suggest checking the other criterion.
    expect(brief.nextStep).toContain(recall.rubric[1]);
  });

  it("finds overlapping vocabulary but never labels an answer correct", () => {
    const answer =
      "Mielenterveys auttaa arjessa, ihminen käsittelee vaikeuksia. Suru on tavallinen tunne ja hyvinvointi ei tarkoita aina iloisuutta.";
    const result = analyzeWrittenAnswer(answer, recall);
    expect(result.kind).toBe("substantive");
    expect(result.sharedTerms).toContain("mielenterveys");
    expect(result.sharedTerms.length).toBeGreaterThan(0);
    expect(result.sharedTerms.length).toBeLessThanOrEqual(4);
    expect(result.introduction + result.nextStep).not.toMatch(
      /oikein|virheettömä|\/4|arvosana/i,
    );
  });

  it("does not infer correctness from negated or copied words", () => {
    const result = analyzeWrittenAnswer(
      "Mielenterveys auttaa arjessa. Suru ei ole normaali tunne. Ihminen ei voi tuntea surua, koska suru on kielletty.",
      recall,
    );
    expect(result.sharedTerms.length).toBeGreaterThan(0);
    expect(result).not.toHaveProperty("score");
    expect(result).not.toHaveProperty("correct");
    expect(result.introduction).toMatch(/tarkistaa/i);
  });

  it("uses the authored rubric for every lesson and exam task", () => {
    const tasks = [
      ...lessons.flatMap((l) => [l.recall, l.application]),
      ...examItems.map((i) => i.written),
    ];
    expect(tasks).toHaveLength(117);
    for (const task of tasks) {
      const result = analyzeWrittenAnswer("En tiedä?", task);
      expect(result.focus).toBe(task.rubric[0]);
      expect(result.nextStep).toContain(task.rubric[0]);
      expect(result.sharedTerms).toEqual([]);
    }
  });
});
