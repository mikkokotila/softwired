/**
 * Recognises common short admissions of not knowing. These are real attempts
 * to engage with the task, but never evidence of independent mastery.
 * Longer substantive answers are not heuristically graded here.
 */
export function isUnsureAnswer(answer: string): boolean {
  const text = answer
    .trim()
    .toLocaleLowerCase("fi-FI")
    .replace(/[.!?…\s]+$/g, "");
  return /^(?:en (?:tiedä|tieda|tiiä|osaa|muista)(?: vielä)?|emt|ei hajua)$/.test(
    text,
  );
}

/** A one-character response is valid input: feedback, not length, teaches. */
export function hasAttempt(answer: string): boolean {
  return answer.trim().length > 0;
}
