export interface Question {
  id: string;
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
}
export interface WrittenTask {
  prompt: string;
  model: string;
  rubric: string[];
}
export interface Lesson {
  id: string;
  sectionId: string;
  title: string;
  hook: string;
  paragraphs: string[];
  diagram: { title: string; steps: string[] };
  example: string;
  terms: { word: string; definition: string }[];
  recall: WrittenTask;
  questions: Question[];
  application: WrittenTask;
  source: { pdf: [number, number]; book: [number, number] };
  minutes: number;
}
export interface Section {
  id: string;
  title: string;
  description: string;
  group: string;
  color: "lilac" | "lime" | "peach" | "blue";
  source: Lesson["source"];
  lessons: Lesson[];
}
export interface ExamItem {
  id: string;
  sectionId: string;
  lessonId: string;
  choice: Question;
  written: WrittenTask;
}
// Compact authoring helper; every piece of teaching and every assessment below is authored separately.
export function lesson(
  sectionId: string,
  n: number,
  data: Omit<Lesson, "id" | "sectionId" | "minutes" | "questions"> & {
    questions: [string, string[], number, string][];
  },
): Lesson {
  const id = `${sectionId}-${n}`;
  return {
    ...data,
    id,
    sectionId,
    minutes: 5,
    questions: data.questions.map(
      ([prompt, options, correct, explanation], i) => ({
        id: `${id}-q${i + 1}`,
        prompt,
        options,
        correct,
        explanation,
      }),
    ),
  };
}
