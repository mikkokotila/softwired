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
