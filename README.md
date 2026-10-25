# KIPINÄ

A runnable Finnish Terveystieto 8 study PWA. React + TypeScript + Vite, an Express backend and the OpenAI-compatible SDK targeting Meta Model API. The private textbook scan is **not** required at runtime and is not distributed.

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

No key is needed to study. With no server key, the UI says **“AI odottaa avainta”** and disables sending. An unreachable server is reported separately. A configured key is not called a verified connection until a real request succeeds. **No paid calls are made automatically**, including at startup or in tests.

```sh
cp .env.example .env
# Edit .env locally: MUSE_API_KEY=... (Meta Model API key)
npm run dev
```

The default is exactly **`muse-spark-1.3-contributor`**. `MUSE_MODEL` is configurable; the app never silently substitutes a model. Your Meta Model API account must have access and billing. The SDK targets Meta Model API at https://api.meta.ai/v1 rather than OpenAI servers. Responses API requests use `store:false`, strict JSON schema, `max_output_tokens:3000`, no automatic SDK retries and a 45-second SDK timeout. The route adds a 50-second deadline; browser cancellation is supported. A successful response includes server-derived lesson/page metadata. No original page images or PDF are sent.

Explain, Socratic hint, dialogue and rubric grading (0–4) use server-curated lesson context. Client-supplied context, unknown lessons and oversized input are rejected. Student messages/history are passed as untrusted data, not privileged instructions. Hint context excludes the model answer/rubric. No tools, browsing or secret material are supplied to the model. Prompt separation reduces injection risk; it is not a proof against all model misbehaviour. Grades remain advisory and need human judgement.

The student explicitly consents before sending; questions, answers, course context and recent dialogue may go to Meta. Consent can be withdrawn in Settings and resets on import. Students are told to use fictional examples and avoid names, health details and family disclosures. Chats are ephemeral in the UI; written lesson/exam answers persist locally. `store:false` controls Responses storage but does NOT disable Meta Contributor training or promise zero provider-side retention. In Contributor mode Meta may use prompts, answers and context to train and improve AI models. Consent for the former provider is not reused. API use is paid; the UI names the model and explains variable token-based cost without inventing a fixed price.

Implementation references: [Meta Responses API](https://dev.meta.ai/docs/protocols/responses), [Meta structured outputs](https://dev.meta.ai/docs/cookbook/structured-output), [Meta Contributor terms](https://dev.meta.ai/legal/terms-of-service).

## Server and deployment

The default bind is loopback. For public hosting, serve the Node app behind HTTPS, set `APP_ORIGIN` to its exact origin and set **`APP_ACCESS_TOKEN` to a random secret of at least 24 characters**. Public production origins and any non-loopback bind fail startup without it. A student enters this deployment access token in Settings. This is not the Meta Model API key. Access is kept in a signed, HttpOnly, SameSite cookie; the token is not persisted in browser storage. Set `SESSION_SECRET` to a strong random value if sessions should survive server restarts. Cookies become Secure for HTTPS origins.

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

The E2E suite launches an isolated production server on port 4175 (overridable with E2E_PORT), with an explicitly empty Muse key. On a Mac with Chrome already installed, use `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`. Tests cover curriculum, scheduling/mastery, backups, official SDK request shape, API validation/auth/CSRF/limits/errors/timeouts, actual browser lesson/exam flows, offline reload and WCAG accessibility checks. See [verification record](docs/VERIFICATION.md) for the actual final run and limitations. The progression-blocker regression and all-lesson novice-path audit are described in [Learning QC](docs/LEARNING_QC.md).

## Project layout

`src/content/`: authored Finnish curriculum, glossary, finite exam bank and medical editorial note. `src/lib/`: learning rules, schema/migrations, browser storage and API client. `src/components/`: views and assessments. `server/`: isolated Meta Muse Spark integration using the OpenAI-compatible SDK and secure same-origin HTTP API. `tests/` and `e2e/`: unit/API and production-browser verification. No deployment, Git commit or push is performed by build commands.

## Local Meta credential

This project reads an ignored local .env file. On this Mac, its Muse API key comes from the single muse_api_key entry in ~/.env. Do not copy ~/.env wholesale: it can contain unrelated credentials. The app credential file should have mode 0600 and must never be committed.

**Contributor data-use notice:** Meta may use submitted text, context and responses to train and improve its AI models. Even store:false does not override Contributor training terms. The student should use fictional examples, avoid names or sensitive personal details and discuss AI use with a parent or guardian. Offline lessons and review work without any AI connection.

Unit tests mock the remote SDK and make no paid provider calls. Live provider verification is documented in docs/VERIFICATION.md; API connectivity is not proof of grading accuracy.
