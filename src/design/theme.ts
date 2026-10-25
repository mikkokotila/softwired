/**
 * Softwired's presentation preferences are intentionally independent of the
 * lesson-state schema. Changing or adding skins never migrates study records.
 */
export const THEME_STORAGE_KEY = "softwired.appearance.v1";

export const THEMES = [
  {
    id: "orbit",
    name: "Orbit",
    description: "Tumma pelimaailma · lime ja syaani",
  },
  {
    id: "nebula",
    name: "Nebula",
    description: "Tumma · violetti ja pinkki",
  },
  {
    id: "daybreak",
    name: "Daybreak",
    description: "Vaalea · rauhallinen ja selkeä",
  },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];
export const DEFAULT_THEME: ThemeId = "orbit";

export function isThemeId(value: unknown): value is ThemeId {
  return THEMES.some((theme) => theme.id === value);
}

export function readTheme(
  storage: Pick<Storage, "getItem"> | undefined,
): ThemeId {
  try {
    const raw = storage?.getItem(THEME_STORAGE_KEY);
    return isThemeId(raw) ? raw : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function saveTheme(
  storage: Pick<Storage, "setItem"> | undefined,
  theme: ThemeId,
): void {
  try {
    storage?.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private browsing may restrict storage. Appearance remains usable now.
  }
}
