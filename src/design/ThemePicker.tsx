import { Check, Palette } from "lucide-react";
import { THEMES } from "./theme";
import { useTheme } from "./ThemeProvider";

/** Visual samples inherit the same semantic variables as the actual app. */
export function ThemePicker() {
  const { theme, setTheme } = useTheme();

  return (
    <section
      className="card settings-section appearance-settings"
      aria-labelledby="appearance-title"
    >
      <span className="icon-square violet">
        <Palette size={23} />
      </span>
      <h2 id="appearance-title">Valitse oma tunnelma</h2>
      <p>
        Vaihda ulkoasua milloin tahansa. Vastaukset ja edistyminen eivät muutu.
        Valinta tallentuu vain tähän selaimeen.
      </p>
      <fieldset className="theme-picker">
        <legend className="sr-only">Ulkoasun teema</legend>
        {THEMES.map((option) => (
          <label
            key={option.id}
            className={
              "theme-choice " + (theme === option.id ? "selected" : "")
            }
          >
            <input
              type="radio"
              name="appearance"
              value={option.id}
              checked={theme === option.id}
              onChange={() => setTheme(option.id)}
            />
            <span
              className="theme-sample"
              data-theme={option.id}
              aria-hidden="true"
            >
              <span className="theme-sample-rail" />
              <span className="theme-sample-content">
                <span className="theme-sample-hero" />
                <span className="theme-sample-cards">
                  <i />
                  <i />
                  <i />
                </span>
              </span>
            </span>
            <span className="theme-choice-details">
              <strong>{option.name}</strong>
              <small>{option.description}</small>
            </span>
            <span className="theme-selected-indicator" aria-hidden="true">
              {theme === option.id && <Check size={15} />}
            </span>
          </label>
        ))}
      </fieldset>
    </section>
  );
}
