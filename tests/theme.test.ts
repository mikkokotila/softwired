import { expect, it } from "vitest";
import {
  DEFAULT_THEME,
  isThemeId,
  readTheme,
  saveTheme,
  THEME_STORAGE_KEY,
  THEMES,
} from "../src/design/theme";

it("supports three first-class, documented themes", () => {
  expect(THEMES.map((item) => item.id)).toEqual([
    "orbit",
    "nebula",
    "daybreak",
  ]);
  for (const item of THEMES) expect(isThemeId(item.id)).toBe(true);
  expect(isThemeId("unknown")).toBe(false);
});

it("keeps appearance separate from study data", () => {
  const store = new Map<string, string>();
  const storage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
  };
  expect(readTheme(storage)).toBe(DEFAULT_THEME);
  saveTheme(storage, "nebula");
  expect(store.get(THEME_STORAGE_KEY)).toBe("nebula");
  expect(readTheme(storage)).toBe("nebula");
  expect(store.has("kipina.study.v2")).toBe(false);
  store.set(THEME_STORAGE_KEY, "invalid");
  expect(readTheme(storage)).toBe(DEFAULT_THEME);
});

it("fails to the default theme when browser storage is unavailable", () => {
  expect(readTheme(undefined)).toBe(DEFAULT_THEME);
  expect(
    readTheme({
      getItem: () => {
        throw new Error("forbidden");
      },
    }),
  ).toBe(DEFAULT_THEME);
  expect(() =>
    saveTheme(
      {
        setItem: () => {
          throw new Error("forbidden");
        },
      },
      "daybreak",
    ),
  ).not.toThrow();
});
