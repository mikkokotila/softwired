# Softwired Design System — Orbit v1

The student-facing app is **Softwired**. Its foundation is a game-inspired mission dashboard, not a literal game, social feed or point-chasing system. Every number on the dashboard comes from real learning-state records. No fabricated XP, rankings or punitive streaks are presented.

## Design architecture

| Layer                     | File                          | Responsibility                                                                                            |
| ------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| Theme palette and scales  | src/design/tokens.css         | Semantic colors, spacing, typography, radii, motion, elevation, layout widths and visual art stops        |
| Baseline component layout | src/styles.css                | Shared structure and existing learning modules, with every authored color converted to semantic variables |
| Command Center skin       | src/design/command-center.css | Mission-based homepage, rail, navigation, learning stages, exams, settings, all breakpoint behaviors      |
| Theme registry            | src/design/theme.ts           | Theme identifiers, names, descriptions and resilient browser preference read/write                        |
| React theme control       | src/design/ThemeProvider.tsx  | Applies data-theme to html, updates browser theme-color and persists appearance independently             |
| Visible theme control     | src/design/ThemePicker.tsx    | Accessible radio-group in Settings, with miniature previews using the real theme tokens                   |
| Source-of-truth content   | src/content/                  | Authored lessons, tasks and marking rubrics: deliberately independent of visual themes                    |

Themes are Orbit (dark/lime/cyan, default), Nebula (dark/violet/pink) and Daybreak (light/teal). Theme selection is stored in softwired.appearance.v1. The older kipina.study.v2 internal data key is **unchanged on purpose**; renaming it would risk orphaning existing learner progress.

## Token rules

- Feature CSS must consume semantic variables such as --page-bg, --surface-card, --surface-strong, --text-main, --text-secondary, --border-subtle, --accent, --accent-ink, --cyan, --violet, --amber, --radius-lg and --space-6.
- New literal hex values belong **only** in the theme palette section of tokens.css. src/styles.css and command-center.css are intentionally literal-color-free.
- Use --accent for backgrounds and --accent-ink for text. That distinction matters in Daybreak, where the background mint is too light for readable text.
- Keep button, field, toast/notice and navigation state colors semantic, not tied to a named theme or a specific page.
- The semantic contract also defines --font-heading, --font-body, --font-mono, a four-point --space-* scale, radii, shadows, interaction timing and responsive layout dimensions.
- Font files are self-hosted through package dependencies. Space Grotesk is used for headlines and titles, DM Sans for UI/body text, and Manrope is retained for graceful fallback. Licenses are shipped in public/licenses/.

## Add a new theme

1. Add a palette variant in src/design/tokens.css using a data-theme attribute, overriding the semantic values. Do not create per-page hardcoded colors.
2. Add a typed entry in src/design/theme.ts; this automatically appears in the Settings theme selector.
3. Use the theme preview in Settings to check accent/background, all interface states and navigation.
4. Run the typecheck, lint, test, production build and full Playwright suite; test dark and light contrast, 320–1440px widths, keyboard/focus, lesson feedback, onboarding and exam screens.

Do not place themes inside lesson state or save them in backup JSON. Students should be able to change style without impacting exams, practice due dates or AI consent.

## UX principles

- **Strong hierarchy:** one primary mission CTA, clear next task, fast scan of real progress and course areas.
- **Navigation:** compact persistent icon rail on desktop; visible, finger-sized bottom tabs on mobile and a focus-trapped expandable drawer for additional routes.
- **Student agency:** real links for 5-minute lesson / 20-minute session / free course exploration; never trap a learner behind an answer threshold.
- **Exam seriousness:** gaming vocabulary can frame an exam (e.g. Boss Level) without reducing the quality of explanations, recall or written assessment.
- **Accessible by default:** WCAG A/AA checks across theme variants, explicit focus rings, no reliance on color alone, user-controlled contrast, reduced-motion preference and independent offlining.
- **Explicit status:** disabled AI is displayed as unavailable. Public Pages Functions never silently create paid tutor requests.

## Testing contract

tests/theme.test.ts verifies theme registry and storage resilience. tests/design-tokens.test.ts verifies centralization of colors and missing variables. e2e/softwired-design.spec.ts covers branding, persistence, responsiveness, accessibility, navigation and theme switching on desktop/mobile. The older lesson, offline, progress and exam tests remain in force.

## Updating appearance without changing learning

Only update src/design/tokens.css and/or src/design/command-center.css, then run the test suite. React components should not depend on a theme name except for the selector previews. Do not change the src/content/ layer to accommodate a visual design or invent scores to populate an attractive dashboard.
