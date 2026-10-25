import { sections, lessons } from "../src/content";
import { examItems } from "../src/content/exams";
export function validateCurriculum() {
  const errors: string[] = [];
  const expected = [
    "1.1",
    "1.2",
    "1.4",
    "5.1",
    "5.2",
    "5.3",
    "6.1",
    "6.2",
    "7.3",
    "8.1",
    "8.2",
    "8.3",
    "8.4",
  ];
  if (JSON.stringify(sections.map((s) => s.id)) !== JSON.stringify(expected))
    errors.push("All 13 mapped sections must be present, in order.");
  if (lessons.length < 52)
    errors.push(`Expected >=52 lessons, got ${lessons.length}.`);
  const allQuestions = lessons.flatMap((l) => l.questions);
  if (allQuestions.length < 104)
    errors.push(
      `Expected >=104 objective questions, got ${allQuestions.length}.`,
    );
  for (const section of sections) {
    if (section.lessons.length < 4)
      errors.push(`${section.id}: fewer than four complete lessons.`);
    for (const l of section.lessons) {
      if (l.sectionId !== section.id)
        errors.push(`${l.id}: wrong parent section.`);
      if (l.title.length < 15 || l.hook.length < 40)
        errors.push(`${l.id}: title/hook too thin.`);
      if (
        l.paragraphs.length < 2 ||
        l.paragraphs.some((p) => p.length < 200) ||
        l.paragraphs.join(" ").split(/\s+/).length < 80
      )
        errors.push(`${l.id}: substantive multiparagraph teaching required.`);
      if (
        l.example.length < 70 ||
        l.diagram.steps.length < 3 ||
        l.terms.length < 2 ||
        l.terms.some((t) => t.definition.length < 20)
      )
        errors.push(`${l.id}: example, diagram or definitions incomplete.`);
      for (const task of [l.recall, l.application])
        if (
          task.prompt.length < 35 ||
          task.model.length < 100 ||
          task.rubric.length < 2
        )
          errors.push(`${l.id}: written task/model/rubric incomplete.`);
      if (l.questions.length < 2)
        errors.push(`${l.id}: two scored questions required.`);
      for (const q of l.questions)
        if (
          q.options.length < 3 ||
          new Set(q.options).size !== q.options.length ||
          q.correct < 0 ||
          q.correct >= q.options.length ||
          q.explanation.length < 70
        )
          errors.push(`${q.id}: invalid assessment.`);
      if (JSON.stringify(l.source) !== JSON.stringify(section.source))
        errors.push(`${l.id}: source range mismatch.`);
    }
  }
  for (const [name, values] of [
    ["lesson IDs", lessons.map((l) => l.id)],
    ["lesson titles", lessons.map((l) => l.title)],
    ["question IDs", allQuestions.map((q) => q.id)],
    ["question prompts", allQuestions.map((q) => q.prompt)],
    ["teaching paragraphs", lessons.flatMap((l) => l.paragraphs)],
    ["written prompts", lessons.map((l) => l.application.prompt)],
  ] as const)
    if (new Set(values).size !== values.length)
      errors.push(`Duplicate ${name}.`);
  if (
    examItems.length !== 13 ||
    new Set(examItems.map((i) => i.sectionId)).size !== 13
  )
    errors.push("Exam bank must cover all 13 sections.");
  if (
    examItems.some((i) =>
      allQuestions.some((q) => q.prompt === i.choice.prompt),
    )
  )
    errors.push("Exam choices must be novel.");
  return errors;
}
if (process.argv[1]?.endsWith("validate-content.ts")) {
  const errors = validateCurriculum();
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else
    console.log(
      `Curriculum valid: ${sections.length} sections, ${lessons.length} lessons, ${lessons.reduce((n, l) => n + l.questions.length, 0)} practice choices, ${lessons.length} recall + ${lessons.length} application tasks, ${examItems.length * 2} novel exam tasks.`,
    );
}
