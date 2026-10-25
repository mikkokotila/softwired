import { describe, expect, it } from "vitest";
import { hasAttempt, isUnsureAnswer } from "../src/lib/answer-flow";
import { freshState, migrate } from "../src/lib/storage";
import { emptyObjective, mastery, recordChoice } from "../src/lib/learning";

describe("honest novice learning paths", () => {
  it("accepts short attempts, without minimum character quotas", () => {
    expect(hasAttempt("")).toBe(false);
    expect(hasAttempt("   \n")).toBe(false);
    expect(hasAttempt("X")).toBe(true);
    expect(hasAttempt("En tiedä?")).toBe(true);
    expect(hasAttempt("tauko")).toBe(true);
  });

  it.each([
    "En tiedä?",
    " en osaa ",
    "En muista.",
    "emt",
    "En tiedä vielä!",
    "En tiiä?",
  ])("recognises not knowing: %s", (answer) =>
    expect(isUnsureAnswer(answer)).toBe(true),
  );

  it.each([
    "",
    "Kyllä",
    "Tunnen käsitteen",
    "En tiedä mistä johtuu",
    "Tämä auttaa.",
  ])("does not infer ignorance from other text: %s", (answer) =>
    expect(isUnsureAnswer(answer)).toBe(false),
  );

  it("stores -1 as not-known without independent mastery", () => {
    const state = freshState();
    state.drafts["1.1-1"] = {
      stage: 3,
      recall: "",
      written: "",
      choiceIndex: 1,
      answers: { "1.1-1-q1": -1 },
      recallSubmitted: true,
      writtenSubmitted: false,
      rubricViewed: false,
      helpUsed: true,
    };
    const migrated = migrate(state);
    expect(migrated.drafts["1.1-1"].answers["1.1-1-q1"]).toBe(-1);
    const o = recordChoice(
      { ...emptyObjective(), seenAt: 100 },
      {
        questionId: "1.1-1-q1",
        correct: false,
        independent: false,
        at: 101,
        confidence: "low",
      },
    );
    expect(mastery(o)).toBe("practiced");
    expect(o.dueAt).toBe(101 + 10 * 60_000);
  });
});
