import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_THEME, readTheme, saveTheme, type ThemeId } from "./theme";

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>(() =>
    typeof window === "undefined"
      ? DEFAULT_THEME
      : readTheme(window.localStorage),
  );

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    const metaThemeColor = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );
    const background = getComputedStyle(document.documentElement)
      .getPropertyValue("--page-bg")
      .trim();
    if (metaThemeColor && background) metaThemeColor.content = background;
    saveTheme(window.localStorage, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("ThemeProvider is missing");
  return value;
}
