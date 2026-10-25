import { z } from "zod";
import { lessons } from "../content";
import type { Objective } from "./learning";
const objectiveSchema = z.object({
  seenAt: z.number().nonnegative().optional(),
  completedAt: z.number().nonnegative().optional(),
  evidence: z
    .array(
      z.object({
        questionId: z.string().max(80),
        correct: z.boolean(),
        independent: z.boolean(),
        at: z.number().nonnegative(),
        confidence: z.enum(["low", "medium", "high"]),
      }),
    )
    .max(100),
  mistakes: z.number().int().nonnegative().max(100000),
  dueAt: z.number().nonnegative().optional(),
  intervalDays: z.number().nonnegative().max(30),
  reviews: z.number().int().nonnegative().max(100000),
  delayedRecall: z
    .object({
      at: z.number().nonnegative(),
      score: z.number().min(0).max(4),
      method: z.enum(["self", "ai"]),
    })
    .optional(),
  transfer: z
    .object({
      at: z.number().nonnegative(),
      score: z.number().min(0).max(4),
      method: z.literal("ai"),
    })
    .optional(),
});
const draftSchema = z.object({
  stage: z.number().int().min(0).max(5),
  recall: z.string().max(4000),
  written: z.string().max(4000),
  choiceIndex: z.number().int().min(0).max(2),
  answers: z.record(z.string(), z.number().int().min(0).max(2)),
  recallSubmitted: z.boolean().default(false),
  writtenSubmitted: z.boolean().default(false),
  rubricViewed: z.boolean().default(false),
  helpUsed: z.boolean().default(false),
});
const examSchema = z.object({
  id: z.string().max(80),
  minutes: z.union([z.literal(15), z.literal(40)]),
  seed: z.number().int(),
  startedAt: z.number().nonnegative(),
  finishedAt: z.number().nonnegative().optional(),
  answers: z.record(z.string(), z.string().max(4000)),
  selfScores: z.record(z.string(), z.number().int().min(0).max(4)),
  aiScores: z.record(
    z.string(),
    z.object({
      score: z.number().int().min(0).max(4),
      feedback: z.string().max(6000),
    }),
  ),
});
export const stateSchema = z
  .object({
    version: z.literal(2),
    onboarded: z.boolean(),
    consent: z.boolean(),
    goalMinutes: z.literal(20),
    examDate: z.string().max(10),
    objectives: z.record(z.string(), objectiveSchema),
    drafts: z.record(z.string(), draftSchema),
    activity: z
      .array(
        z.object({
          day: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
          lessons: z.number().int().nonnegative(),
          reviews: z.number().int().nonnegative(),
        }),
      )
      .max(366),
    exams: z.array(examSchema).max(20),
    activeExam: examSchema.optional(),
    focusPlan: z
      .object({
        day: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        createdAt: z.number().nonnegative(),
        items: z
          .array(
            z.object({
              lessonId: z.string().max(30),
              kind: z.enum(["lesson", "review"]),
              done: z.boolean(),
            }),
          )
          .max(4),
      })
      .optional(),
  })
  .strict()
  .superRefine((s, ctx) => {
    const valid = new Set(lessons.map((l) => l.id));
    for (const id of [
      ...Object.keys(s.objectives),
      ...Object.keys(s.drafts),
      ...(s.focusPlan?.items.map((i) => i.lessonId) ?? []),
    ])
      if (!valid.has(id))
        ctx.addIssue({
          code: "custom",
          message: `Tuntematon oppitunti: ${id}`,
        });
  });
export type StudyState = z.infer<typeof stateSchema>;
export type LessonDraft = z.infer<typeof draftSchema>;
export type ExamSession = z.infer<typeof examSchema>;
export const STORAGE_KEY = "kipina.study.v2";
export const freshState = (): StudyState => ({
  version: 2,
  onboarded: false,
  consent: false,
  goalMinutes: 20,
  examDate: "",
  objectives: {},
  drafts: {},
  activity: [],
  exams: [],
});
export function migrate(raw: unknown): StudyState {
  const parsed = stateSchema.safeParse(raw);
  if (parsed.success) return parsed.data;
  // A v1 backup contains only viewed lesson IDs. Never upgrade clicks to demonstrated mastery.
  const legacy = z
    .object({ version: z.literal(1), seen: z.array(z.string()).max(52) })
    .safeParse(raw);
  if (legacy.success) {
    const next = freshState();
    for (const id of legacy.data.seen)
      if (lessons.some((l) => l.id === id))
        next.objectives[id] = {
          seenAt: Date.now(),
          evidence: [],
          mistakes: 0,
          intervalDays: 0,
          reviews: 0,
        };
    return next;
  }
  throw new Error(
    "Varmuuskopio ei ole tuettua Kipinä-muotoa. Nykyisiä tietoja ei muutettu.",
  );
}
export interface LoadResult {
  state: StudyState;
  error?: string;
}
export function loadState(storage: Pick<Storage, "getItem">): LoadResult {
  try {
    const raw =
      storage.getItem(STORAGE_KEY) ?? storage.getItem("kipina.study.v1");
    return { state: raw ? migrate(JSON.parse(raw)) : freshState() };
  } catch {
    return {
      state: freshState(),
      error:
        "Tallennettua edistymistä ei voitu lukea. Vanha tallenne on säilytetty; vie se talteen ennen tallennuksen palauttamista.",
    };
  }
}
export function persist(
  storage: Pick<Storage, "setItem">,
  state: StudyState,
): string | undefined {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
    return undefined;
  } catch {
    return "Selaintallennus ei onnistunut. Edistyminen on vain tämän istunnon muistissa; vie varmuuskopio.";
  }
}
export function parseBackup(text: string): StudyState {
  if (text.length > 2_000_000)
    throw new Error("Varmuuskopio on liian suuri (enintään 2 Mt).");
  const imported = migrate(JSON.parse(text));
  // Consent is device/session-specific and must be requested again on a new import.
  return { ...imported, consent: false };
}
export function localDay(now = new Date()) {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
export function addActivity(
  state: StudyState,
  kind: "lessons" | "reviews",
): StudyState["activity"] {
  const day = localDay();
  const old = state.activity.find((a) => a.day === day) ?? {
    day,
    lessons: 0,
    reviews: 0,
  };
  return [
    ...state.activity.filter((a) => a.day !== day).slice(-365),
    { ...old, [kind]: old[kind] + 1 },
  ];
}
export function withObjective(
  state: StudyState,
  id: string,
  objective: Objective,
): StudyState {
  return { ...state, objectives: { ...state.objectives, [id]: objective } };
}
