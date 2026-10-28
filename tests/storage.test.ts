import { it, expect } from "vitest";
import {
  freshState,
  loadState,
  migrate,
  parseBackup,
  persist,
  STORAGE_KEY,
} from "../src/lib/storage";
it("roundtrips progress and active exam deadlines without secrets", () => {
  const s = freshState();
  s.activeExam = {
    id: "x",
    minutes: 15,
    seed: 4,
    startedAt: 123,
    answers: { "exam-1.1-choice": "2" },
    selfScores: {},
    aiScores: {},
  };
  const map = new Map<string, string>();
  const storage = {
    getItem: (key: string) => map.get(key) ?? null,
    setItem: (key: string, value: string) => {
      map.set(key, value);
    },
  };
  expect(persist(storage, s)).toBeUndefined();
  expect(loadState(storage).state).toEqual(s);
  expect(map.get(STORAGE_KEY)).not.toContain("API_KEY");
});
it("preserves a corrupt stored value and reports recovery state", () => {
  const map = new Map([[STORAGE_KEY, "broken-json"]]);
  const result = loadState({ getItem: (key) => map.get(key) ?? null });
  expect(result.error).toBeTruthy();
  expect(map.get(STORAGE_KEY)).toBe("broken-json");
});
it("migrates viewed v1 lessons without inventing mastery", () => {
  const s = migrate({ version: 1, seen: ["1.1-1", "invalid"] });
  expect(Object.keys(s.objectives)).toEqual(["1.1-1"]);
  expect(s.objectives["1.1-1"].evidence).toEqual([]);
});
it("rejects invalid backup shape, unknown lesson and oversized files", () => {
  expect(() => parseBackup("{bad")).toThrow();
  expect(() =>
    parseBackup(JSON.stringify({ ...freshState(), version: 99 })),
  ).toThrow();
  const s = freshState();
  s.objectives.unknown = {
    evidence: [],
    mistakes: 0,
    intervalDays: 0,
    reviews: 0,
  };
  expect(() => parseBackup(JSON.stringify(s))).toThrow();
  expect(() => parseBackup("a".repeat(2_000_001))).toThrow();
});
it("resets AI consent when restoring a backup", () => {
  expect(
    parseBackup(JSON.stringify({ ...freshState(), consent: true })).consent,
  ).toBe(false);
});
it("reports unavailable or quota-exceeded storage without throwing", () => {
  expect(
    persist(
      {
        setItem: () => {
          throw new Error("QuotaExceeded");
        },
      },
      freshState(),
    ),
  ).toContain("Varmuuskopio".toLowerCase());
});

it("reports malformed backup JSON in Finnish without echoing private file contents", () => {
  expect(() => parseBackup("PRIVATE_INVALID_FILE")).toThrow(
    "Varmuuskopion muoto ei kelpaa",
  );
});

it("keeps prior learning but revokes consent when switching AI providers", () => {
  const previous = { ...freshState(), consent: true };
  const state = migrate(previous);
  expect(state.consent).toBe(false);
  expect(state.consentProvider).toBeUndefined();
  const old = migrate({
    ...freshState(),
    consent: true,
    consentProvider: "meta-muse-spark-contributor-v1",
  });
  expect(old.consent).toBe(false);
  const optedIn = migrate({
    ...freshState(),
    consent: true,
    consentProvider: "openai-u18-study-v1",
  });
  expect(optedIn.consent).toBe(false);
  const current = migrate({
    ...freshState(),
    consent: true,
    consentProvider: "muse-contributor-adult-review-v1",
  });
  expect(current.consent).toBe(true);
});

it("preserves completed lessons, drafts and exams while revoking old Muse consent", () => {
  const legacy = freshState();
  legacy.onboarded = true;
  legacy.consent = true;
  legacy.consentProvider = "meta-muse-spark-contributor-v1";
  legacy.objectives["1.1-3"] = {
    seenAt: 500,
    completedAt: 700,
    evidence: [
      {
        questionId: "1.1-3-q1",
        correct: true,
        independent: true,
        at: 600,
        confidence: "high",
      },
    ],
    mistakes: 0,
    dueAt: 1000,
    intervalDays: 1,
    reviews: 0,
  };
  legacy.drafts["1.1-3"] = {
    stage: 5,
    recall: "Itsetunto kuvaa omaa arvoa.",
    written: "Minäkuva kertoo käsityksestä itsestä.",
    choiceIndex: 1,
    answers: { "1.1-3-q1": 1 },
    recallSubmitted: true,
    writtenSubmitted: true,
    rubricViewed: true,
    helpUsed: false,
  };
  legacy.exams = [
    {
      id: "pilot-exam",
      minutes: 15,
      seed: 2,
      startedAt: 2000,
      finishedAt: 2100,
      answers: { exam1: "Koevastaus" },
      selfScores: {},
      aiScores: {},
    },
  ];
  const updated = migrate(legacy);
  expect(updated.consent).toBe(false);
  expect(updated.consentProvider).toBeUndefined();
  expect(updated.onboarded).toBe(true);
  expect(updated.objectives).toEqual(legacy.objectives);
  expect(updated.drafts).toEqual(legacy.drafts);
  expect(updated.exams).toEqual(legacy.exams);
});
