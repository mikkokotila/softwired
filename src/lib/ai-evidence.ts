import { isUnsureAnswer } from "./answer-flow";
import { emptyObjective } from "./learning";
import type { StudyState } from "./storage";

/**
 * Records AI-assessed independent transfer only against the currently locked,
 * original answer. An asynchronous response must not award mastery after a
 * learner has opened the model answer, obtained help, or changed the draft.
 */
export function recordIndependentTransfer(
  state: StudyState,
  lessonId: string,
  answerAtSubmission: string,
  score: number,
  at = Date.now(),
): StudyState {
  const draft = state.drafts[lessonId];
  if (
    !draft?.writtenSubmitted ||
    draft.helpUsed ||
    draft.rubricViewed ||
    draft.written.trim() !== answerAtSubmission.trim() ||
    draft.written.trim().length < 20 ||
    isUnsureAnswer(draft.written) ||
    !Number.isInteger(score) ||
    score < 0 ||
    score > 4
  )
    return state;
  return {
    ...state,
    objectives: {
      ...state.objectives,
      [lessonId]: {
        ...(state.objectives[lessonId] ?? emptyObjective()),
        transfer: { at, score, method: "ai" },
      },
    },
  };
}
