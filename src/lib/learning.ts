import { lessonById, lessons } from "../content";
export type Confidence = "low" | "medium" | "high";
export interface Evidence {
  questionId: string;
  correct: boolean;
  independent: boolean;
  at: number;
  confidence: Confidence;
}
export interface Objective {
  seenAt?: number;
  completedAt?: number;
  evidence: Evidence[];
  mistakes: number;
  dueAt?: number;
  intervalDays: number;
  reviews: number;
  delayedRecall?: { at: number; score: number; method: "self" | "ai" };
  transfer?: { at: number; score: number; method: "ai" };
}
export type Mastery = "new" | "seen" | "practiced" | "mastered";
export const DAY = 86_400_000;
export const emptyObjective = (): Objective => ({
  evidence: [],
  mistakes: 0,
  intervalDays: 0,
  reviews: 0,
});
export function mastery(o?: Objective): Mastery {
  if (!o?.seenAt) return "new";
  const distinct = new Set(
    o.evidence
      .filter((e) => e.correct && e.independent)
      .map((e) => e.questionId),
  );
  const latestMistake = Math.max(
    0,
    ...o.evidence.filter((e) => !e.correct).map((e) => e.at),
    o.delayedRecall && o.delayedRecall.score < 3 ? o.delayedRecall.at : 0,
    o.transfer && o.transfer.score < 3 ? o.transfer.at : 0,
  );
  const transfer =
    !!o.transfer && o.transfer.score >= 3 && o.transfer.at >= latestMistake;
  const recall =
    !!o.delayedRecall &&
    o.delayedRecall.score >= 3 &&
    o.delayedRecall.at - o.seenAt >= DAY &&
    o.delayedRecall.at >= latestMistake;
  if (distinct.size >= 2 && (transfer || recall)) return "mastered";
  return o.evidence.length ? "practiced" : "seen";
}
export const masteryLabel: Record<Mastery, string> = {
  new: "Aloittamatta",
  seen: "Nähty",
  practiced: "Harjoiteltu",
  mastered: "Hallittu",
};
export function schedule(
  o: Objective,
  correct: boolean,
  confidence: Confidence,
  now: number,
): Objective {
  const intervals = [1, 3, 7, 14, 30];
  const successfulReviews = correct ? o.reviews + 1 : 0;
  const days = correct
    ? confidence === "low"
      ? 1
      : intervals[Math.min(successfulReviews - 1, intervals.length - 1)]
    : 0;
  return {
    ...o,
    intervalDays: days,
    reviews: successfulReviews,
    dueAt: now + (correct ? days * DAY : 10 * 60_000),
  };
}
export function recordChoice(o: Objective, e: Evidence): Objective {
  const updated = {
    ...o,
    evidence: [...o.evidence.slice(-99), e],
    mistakes: o.mistakes + (e.correct ? 0 : 1),
  };
  if (!e.correct) return schedule(updated, false, e.confidence, e.at);
  // A pair of questions is one study event, not two spaced reviews.
  return updated.dueAt === undefined
    ? { ...updated, intervalDays: 1, dueAt: e.at + DAY }
    : updated;
}
export function recordRecall(
  o: Objective,
  score: number,
  method: "self" | "ai",
  now: number,
): Objective {
  if (!o.seenAt || now - o.seenAt < DAY) return o; // Same-day self marks never produce mastery.
  const confidence: Confidence = o.evidence
    .slice(-2)
    .some((e) => e.at >= now - 10 * 60_000 && e.confidence === "low")
    ? "low"
    : "medium";
  return schedule(
    { ...o, delayedRecall: { at: now, score, method } },
    score >= 3,
    confidence,
    now,
  );
}
export function reviewQueue(
  objectives: Record<string, Objective>,
  now = Date.now(),
) {
  const candidates = lessons
    .filter(
      (l) =>
        objectives[l.id]?.dueAt !== undefined && objectives[l.id].dueAt! <= now,
    )
    .sort(
      (a, b) =>
        (mastery(objectives[a.id]) === "mastered" ? 1 : 0) -
          (mastery(objectives[b.id]) === "mastered" ? 1 : 0) ||
        objectives[b.id].mistakes - objectives[a.id].mistakes ||
        objectives[a.id].dueAt! - objectives[b.id].dueAt!,
    );
  const result = [];
  let lastSection = "";
  while (candidates.length) {
    let i = candidates.findIndex((l) => l.sectionId !== lastSection);
    if (i < 0) i = 0;
    const [next] = candidates.splice(i, 1);
    result.push(next);
    lastSection = next.sectionId;
  }
  return result;
}
export function nextLesson(objectives: Record<string, Objective>) {
  return (
    lessons.find(
      (l) => objectives[l.id]?.seenAt && !objectives[l.id]?.completedAt,
    ) ??
    lessons.find((l) => !objectives[l.id]?.completedAt) ??
    lessons[0]
  );
}
export function stats(objectives: Record<string, Objective>) {
  const values = lessons.map((l) => mastery(objectives[l.id]));
  return {
    seen: values.filter((s) => s !== "new").length,
    practiced: values.filter((s) => s === "practiced" || s === "mastered")
      .length,
    mastered: values.filter((s) => s === "mastered").length,
    completed: lessons.filter((l) => objectives[l.id]?.completedAt).length,
  };
}
export function validLessonId(id: string) {
  return Object.hasOwn(lessonById, id);
}
