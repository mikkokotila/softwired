import { lessons } from "../content";
import { reviewQueue } from "./learning";
import { localDay, type StudyState } from "./storage";
export function makeFocusPlan(state: StudyState) {
  const due = reviewQueue(state.objectives);
  const items: {
    lessonId: string;
    kind: "lesson" | "review";
    done: boolean;
  }[] = [];
  if (due[0]) items.push({ lessonId: due[0].id, kind: "review", done: false });
  for (const l of lessons.filter((l) => !state.objectives[l.id]?.completedAt)) {
    if (items.length >= 4) break;
    items.push({ lessonId: l.id, kind: "lesson", done: false });
  }
  for (const l of lessons.filter((l) => state.objectives[l.id]?.completedAt)) {
    if (items.length >= 4) break;
    if (!items.some((i) => i.lessonId === l.id))
      items.push({ lessonId: l.id, kind: "review", done: false });
  }
  return { day: localDay(), createdAt: Date.now(), items };
}
export function finishFocusItem(
  state: StudyState,
  lessonId: string,
  kind: "lesson" | "review",
) {
  if (state.focusPlan?.day !== localDay()) return state.focusPlan;
  return {
    ...state.focusPlan,
    items: state.focusPlan.items.map((i) =>
      i.lessonId === lessonId && i.kind === kind ? { ...i, done: true } : i,
    ),
  };
}
