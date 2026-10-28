# SOFTWIRED

Softwired is a Finnish Terveystieto 8 study PWA with a tokenized gaming-inspired UI. React + TypeScript + Vite, an Express backend and the official OpenAI SDK, with an optional age-appropriate API tutor. The private textbook scan is **not** required at runtime and is not distributed.

## UI and themes

The student-facing product is Softwired, with the **Orbit** Command Center visual direction (gaming-hub inspiration). The design system is organized around semantic CSS tokens, and users can switch between Orbit, Nebula and Daybreak in Settings without changing their study history. Design documentation, token groups, component rules and instructions for extending the palette are in [Design System](docs/DESIGN_SYSTEM.md). Existing browser progress intentionally retains its original internal storage key for safe migration.

## Run

Use Node 24 LTS (`.nvmrc`; Node 22.13+ LTS is also supported).

```sh
npm ci
npm run dev
```

Open **http://127.0.0.1:5173**. Vite proxies `/api` to the Node server at `127.0.0.1:3001`, preserving the frontend origin. Do not run Vite alone when using AI.

For the installable, offline-capable production version:

```sh
npm run build
npm run serve
```

Open **http://127.0.0.1:3001**. The production server serves both the frontend and API. The default origin is correct when no `.env` exists. If you copied `.env.example`, set `APP_ORIGIN=http://127.0.0.1:3001` for production. Use the exact configured hostname; `localhost` and `127.0.0.1` are different origins.

Development does not register an offline worker. Test offline operation using the production build, after its first successful online load. Settings shows whether offline readiness was confirmed. Installation uses Chrome's install option or Safari's Share → Add to Home Screen. HTTPS is required outside loopback hosts.

## Actual scope

- **13 sections, 52 complete lessons**, each with a scenario, several teaching paragraphs, explanatory steps, an example, two terms, recall and transfer prompts with models/rubrics, source ranges and two checked questions.
- **104 objectively scored practice questions**, 52 recall prompts and 52 written applications. **26 separate exam tasks** (13 choices + 13 written transfers). The 15-minute preset uses 9 choices + 4 written tasks across all 13 sections; 40 minutes uses all 26. The authored bank is finite; repeating an exam reorders the same bank, not newly generated items.
- Six-stage lesson flow with locked independent attempts, explanations, explicit self review and optional real AI feedback. A persistent four-part daily path estimates 20 minutes; it does not punish longer thinking or missed days.
- Adaptive due dates, interleaved review, wrong-answer rescue, confidence, distinct seen/practiced/mastered states, evidence provenance and revocation of mastery after later contradictory evidence.
- Local, versioned browser persistence, draft resumption, absolute exam deadlines, validated export/import and recovery warnings. No account or cloud sync. Export backups before clearing browser data.
- Responsive desktop sidebar/mobile navigation, self-hosted fonts, keyboard support, reduced-motion support, install manifest and offline precaching.

One lesson represents one assessed learning objective; the app does not claim granular mastery of every sentence. Two different independent choice successes **plus** a delayed recall self-assessment (>=24 hours, >=3/4) or independent AI-graded application (>=3/4) are required for mastery. Clicking, reading, one lucky choice, same-day self marks, assisted attempts or an AI grade after revealing the model do not qualify. Self-assessed mastery is labelled. This is learning guidance, not a validated psychometric score.

## AI: real integration, no mock connection

No key is needed for the complete offline course. With no server key, the UI says **“AI odottaa avainta”** and disables sending. An unreachable server is reported separately. A configured key is not called a verified connection until a real request succeeds. **No paid calls are made automatically**, including at startup or in tests.

```sh
cp .env.example .env
# Edit .env locally: OPENAI_API_KEY=... (a separate OpenAI API key)
npm run dev
```

The default is GPT-6 Astra (gpt-6-astra), configurable with OPENAI_MODEL. A separate OpenAI API account with active billing is required; a ChatGPT subscription or Muse credential does not supply this. The app never silently downgrades the model. OpenAI Responses API requests use store:false, a strict JSON schema, and 3,000 output tokens at most. Input and output safety checks use the moderation endpoint and fail closed if it is unavailable. The tutor routes and models were configured but a live OpenAI API response has not yet been verified on this Mac.

Explain, Socratic hint, dialogue and rubric grading (0–4) use server-curated lesson context. Client-supplied context, unknown lessons and oversized input are rejected. Student messages/history are passed as untrusted data, not privileged instructions. Hint context excludes the model answer/rubric. No tools, browsing or secret material are supplied to the model. Prompt separation reduces injection risk; it is not a proof against all model misbehaviour. Grades remain advisory and need human judgement.

The student explicitly consents before sending questions, answers, lesson material and recent dialogue to OpenAI API. Chats are ephemeral and written coursework stays in the browser. OpenAI API data is not used for model training by default, but abuse-monitoring logs may contain some inputs and outputs for up to 30 days (and longer if legally or safety-required). The store:false parameter does not guarantee Zero Data Retention. The tutor is age-aware, moderates inputs and outputs, asks for fictional examples and discourages personal data. The developer must still follow the OpenAI Under-18 API guidance. AI grade estimates remain advisory.

Implementation references: https://developers.openai.com/api/docs/guides/migrate-to-responses ; https://developers.openai.com/api/docs/guides/safety-checks/under-18-api-guidance ; https://developers.openai.com/api/docs/guides/your-data

## Server and deployment

The default bind is loopback. For public hosting, serve the Node app behind HTTPS, set `APP_ORIGIN` to its exact origin and set **`APP_ACCESS_TOKEN` to a random secret of at least 24 characters**. Public production origins and any non-loopback bind fail startup without it. A student enters this deployment access token in Settings. This is not the OpenAI API key. Access is kept in a signed, HttpOnly, SameSite cookie; the token is not persisted in browser storage. Set `SESSION_SECRET` to a strong random value if sessions should survive server restarts. Cookies become Secure for HTTPS origins.

The API rejects other origins/cross-site requests, requires a signed session and matching CSRF header, rejects unknown body keys, limits message/history/body sizes and uses Helmet security headers. Rate limits: 8 tutor requests/minute/IP, 8 unlock attempts/15 minutes/IP, 2 simultaneous provider calls, and `AI_DAILY_LIMIT` attempted calls/day (100 default, UTC). All API responses are `no-store`; the service worker never caches `/api`.

These counters are **in memory per process**. A process restart resets them. For multiple instances, add a shared limiter and enforce provider-side project budgets. There is no account system, tamper-proof local grade ledger or managed deployment included. The app does not trust proxy-forwarded IPs by default. Do not add permissive CORS, expose Vite as the public backend or place secrets in `VITE_*` variables.

## Source and editorial review

The assigned 65-page scan was image-only: `pdftotext` produced only page breaks. Local Apple Vision OCR produced text for all 65 pages; representative pages and critical discrepancies were visually inspected. OCR is not a verified transcription. All derived full-page images/OCR remain in ignored `.local/`; no source scan is shipped. Student lessons are authored explanations, not textbook quotations.

[Source map, corrections and remaining review](docs/SOURCE_REVIEW.md) records exact coverage and material differences. Particularly, unconscious people receive **nothing by mouth**, gasping is **not** normal breathing, current CPR guidance takes precedence, and the scan's reversed fat labels are corrected. Ensiapu has visible editorial notes and checked official source links. **Teacher review and qualified first-aid editorial sign-off remain outstanding.** This app is not an emergency service; in a real emergency call 112.

Optional source inspection on macOS (requires Xcode Command Line Tools; does not upload the PDF):

```sh
npm run inspect:source -- "/private/path/Terveystiedon Koe1.pdf"
```

Original PDF files, `.env*`, logs and `.local/` are gitignored. `.env.example` is safe to track. See [licensing considerations](docs/LICENSING.md) before distributing course content.

## Verification

```sh
npm run validate:content
npm run typecheck
npm run lint
npm run test
npm run build
npx playwright install chromium
npm run test:e2e
npm audit
```

The E2E suite launches an isolated production server on port 4175 (overridable with E2E_PORT), with an explicitly empty OpenAI API key. On a Mac with Chrome already installed, use `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`. Tests cover curriculum, scheduling/mastery, backups, official SDK request shape, API validation/auth/CSRF/limits/errors/timeouts, actual browser lesson/exam flows, offline reload and WCAG accessibility checks. See [verification record](docs/VERIFICATION.md) for the actual final run and limitations. The progression-blocker regression and all-lesson novice-path audit are described in [Learning QC](docs/LEARNING_QC.md).

## Project layout

`src/content/`: authored Finnish curriculum, glossary, finite exam bank and medical editorial note. `src/lib/`: learning rules, schema/migrations, browser storage and API client. `src/components/`: views and assessments. `server/`: OpenAI Responses integration with input and output safety checks and secure same-origin HTTP API. `tests/` and `e2e/`: unit/API and production-browser verification. No deployment, Git commit or push is performed by build commands.

## Local provider credentials and pre-test limits

The student-facing app reads only OPENAI_API_KEY from its ignored local environment. An old Muse key may remain in a local ignored configuration file but is not used. Never commit, log or expose any provider key to a browser.

**Provider restriction:** The previous Muse Spark Contributor connection has been removed from the minor-facing student app. Meta Model API Terms of Service dated 9 October 2026 prohibit integrated products targeted at users under 18. Parental permission does not override this restriction. Earlier AI consents are revoked on upgrade without deleting study progress.

Unit tests mock the remote SDK and make no paid provider calls. Live provider verification is documented in docs/VERIFICATION.md; API connectivity is not proof of grading accuracy.

## Cloudflare Pages public pilot

The public production site is https://softwired.mikkokotila.com. Cloudflare
Pages records GitHub main as the source, but the GitHub-triggered deploy
connection still needs repository App authorization/verification. Until it is
fixed, production uploads have been manual. Do not mistake a Git-connected
project setting for an independently verified merge-to-deploy pipeline. The public course runs offline and intentionally disables AI API requests until a separate age-appropriate, access-controlled tutor deployment has passed review. See [deployment instructions](docs/DEPLOYMENT.md) and [licensing notes](docs/LICENSING.md).

## Pre-test distribution

The local address http://127.0.0.1:5173 works only on the host computer, not on a test user's remote device. An independently managed HTTPS pilot with a secure access token is needed for off-machine testing. Do not publicly expose Vite or the AI key.

The current source provides the full offline learning course. AI is intentionally unavailable on this Mac until an OpenAI API key is configured and a live endpoint check succeeds. Review docs/PRETEST_QC.md for release readiness and explicit remaining gates, including teacher source review, first-aid expert sign-off, a provider-compliant under-18 safety review, and a suitable test-user delivery method.
\n## Written feedback\n\nEvery written recall, application, revision and mock-exam response now gets immediate guided feedback and per-question self-review. The public offline feedback identifies only writing/vocabulary cues and does **not** determine semantic correctness or assign grades. See [Written feedback](docs/WRITTEN_FEEDBACK.md).\n
