import { describe, it, expect } from "vitest";
import {
  DAY,
  emptyObjective,
  mastery,
  recordChoice,
  recordRecall,
  reviewQueue,
  schedule,
  stats,
  type Objective,
} from "../src/lib/learning";
import { makeFocusPlan, finishFocusItem } from "../src/lib/focus";
import { freshState } from "../src/lib/storage";
const seen = 1_000_000;
function ready(): Objective {
  return {
    ...emptyObjective(),
    seenAt: seen,
    evidence: ["a", "b"].map((questionId) => ({
      questionId,
      correct: true,
      independent: true,
      at: seen + 1000,
      confidence: "high",
    })),
  };
}
describe("demonstrated mastery", () => {
  it("distinguishes unseen, seen and practiced", () => {
    expect(mastery()).toBe("new");
    expect(mastery({ ...emptyObjective(), seenAt: seen })).toBe("seen");
    expect(mastery(ready())).toBe("practiced");
  });
  it("never awards mastery for one lucky choice or duplicate choice evidence", () => {
    const o = ready();
    o.evidence = [o.evidence[0], o.evidence[0]];
    o.transfer = { at: seen + 1000, score: 4, method: "ai" };
    expect(mastery(o)).toBe("practiced");
  });
  it("requires independent choices and sufficiently strong transfer", () => {
    const o = ready();
    o.transfer = { at: seen + 1000, score: 2, method: "ai" };
    expect(mastery(o)).toBe("practiced");
    o.transfer.score = 3;
    expect(mastery(o)).toBe("mastered");
    o.evidence[0].independent = false;
    expect(mastery(o)).toBe("practiced");
  });
  it("rejects same-day recall and accepts delayed recall with self assessment provenance", () => {
    const o = ready();
    expect(recordRecall(o, 4, "self", seen + DAY - 1)).toEqual(o);
    const updated = recordRecall(o, 3, "self", seen + DAY);
    expect(mastery(updated)).toBe("mastered");
    expect(updated.delayedRecall?.method).toBe("self");
  });
  it("reschedules wrong answers quickly and reduces uncertainty intervals", () => {
    const o = ready();
    const wrong = recordChoice(o, {
      questionId: "c",
      correct: false,
      independent: true,
      at: seen,
      confidence: "high",
    });
    expect(wrong.dueAt).toBe(seen + 600_000);
    expect(wrong.mistakes).toBe(1);
    let success = schedule(o, true, "high", seen);
    expect(success.intervalDays).toBe(1);
    success = schedule(success, true, "high", seen + DAY);
    expect(success.intervalDays).toBe(3);
    expect(schedule(success, true, "low", seen + DAY).intervalDays).toBe(1);
  });
  it("interleaves due sections and prioritizes errors", () => {
    const o = (mistakes: number) => ({
      ...emptyObjective(),
      seenAt: seen,
      dueAt: seen,
      mistakes,
    });
    const qs = reviewQueue(
      {
        "1.1-1": o(5),
        "1.1-2": o(4),
        "1.2-1": o(2),
        "5.1-1": { ...o(99), dueAt: seen + DAY },
      },
      seen + 1000,
    );
    expect(qs.map((l) => l.id)).toEqual(["1.1-1", "1.2-1", "1.1-2"]);
  });
  it("returns a previously mastered goal to practice when later evidence reveals a gap", () => {
    const o = ready();
    o.transfer = { at: seen + DAY, score: 4, method: "ai" };
    expect(mastery(o)).toBe("mastered");
    const updated = recordChoice(o, {
      questionId: "a",
      correct: false,
      independent: true,
      at: seen + 2 * DAY,
      confidence: "high",
    });
    expect(mastery(updated)).toBe("practiced");
  });
  it("does not count two same-session choices as two spaced reviews", () => {
    let o: Objective = { ...emptyObjective(), seenAt: seen };
    for (const questionId of ["a", "b"])
      o = recordChoice(o, {
        questionId,
        correct: true,
        independent: true,
        at: seen + 1,
        confidence: "high",
      }) as typeof o;
    expect(o.reviews).toBe(0);
    expect(o.dueAt).toBe(seen + 1 + DAY);
  });
  it("counts real goals, ignoring unknown map entries", () =>
    expect(stats({ unknown: ready(), "1.1-1": ready() })).toEqual({
      seen: 1,
      practiced: 1,
      mastered: 0,
      completed: 0,
    }));
  it("builds a stable four-part focus session and marks completion without adding work", () => {
    const s = freshState();
    const plan = makeFocusPlan(s);
    expect(plan.items.length).toBe(4);
    s.focusPlan = plan;
    const updated = finishFocusItem(s, plan.items[0].lessonId, "lesson")!;
    expect(updated.items.length).toBe(4);
    expect(updated.items[0].done).toBe(true);
  });
});
