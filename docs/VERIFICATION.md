> Historical QA records below may use the former prototype name. The product is now called **Softwired**; study-state storage keys intentionally remain stable.

# Verification record

25 October 2026, macOS arm64. Supported runtime used: **Node v24.22.1** through `npx --yes --package=node@24 -c '…'`; the system Node v23.10.0 was not changed. The Meta Model API credential was read from ~/.env into an ignored local credential file. Two explicitly initiated live provider calls were made using Muse Spark 1.3 Contributor, without exposing the key.

| Exact command                                | Actual result                                                                                                                                                                                            |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm ci`                                     | Clean lockfile install succeeded: 583 packages installed, 584 audited; zero vulnerabilities. Upstream glob/ESLint deprecation notices were nonfatal.                                                     |
| `npm run validate:content`                   | Passed: 13 sections, 52 complete lessons, 104 checked practice questions, 52 recall + 52 application tasks, 26 distinct exam-bank tasks.                                                                 |
| `npm run typecheck`                          | Passed, no TypeScript errors.                                                                                                                                                                            |
| `npm run lint`                               | Passed, zero errors/warnings (`--max-warnings 0`).                                                                                                                                                       |
| `npm run test`                               | **44 passed in 5 test files**. Includes missing/empty configuration, exact Responses SDK shape, CSRF/auth/limits/timeouts and safe provider failure handling.                                            |
| `npm run build`                              | Passed. Frontend, generated service worker, manifest, fonts and icons plus the production Node backend were generated. No oversized-chunk warning.                                                       |
| `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e` | **20 passed**, no skips or retries; final run 37.4 seconds. Production backend starts automatically on isolated port 4175 with an explicitly empty API key. `E2E_PORT` can override this test-only port. |
| `npm audit`                                  | **Found 0 vulnerabilities**, including development dependencies.                                                                                                                                         |

The browser suite covers desktop 1440×1000 and mobile-emulated 390×844 in installed Chrome. It checks full lesson attempts and resumption, the stable daily path, no fabricated mastery, missing-key state/no paid requests, exam answers/deadlines and expiry, validated backup replacement and consent reset, genuine offline reload with API excluded from caches, delayed self-assessed mastery, keyboard focus/menu trapping, horizontal overflow and axe WCAG A/AA checks on core pages. Dashboard screenshots for both sizes were visually inspected. This does not certify accessibility on every interaction or replace manual assistive-technology testing.

The generated offline precache contains **19 resources, about 747.43 KiB** uncompressed. Core course content and fonts are local. A static-build scan found no secret-like API keys or server instruction prompt. The source PDF, `.env` and `.local` artifacts are absent from tracked files and public assets. The original scan was never copied into public files or sent to Meta.

The initial browser checks found and fixed low contrast, option-label semantics, first-load worker control, menu focus and exam-dialog accessibility. A subsequent clean install and final regression run passed. A transient occupied default app port was avoided by isolating browser tests; no unrelated server was terminated.

## Boundaries still requiring external evidence

- **Live Muse Spark 1.3 Contributor API verified.** One Finnish explanation and one written-answer grading test returned HTTP 200 and the requested model from Meta Model API. The explanation had score null and the grading had an integer score, strengths, improvements and a follow-up question. This verifies connectivity and the structured response contract, **not** grading accuracy against teacher-marked papers. Account cost was not independently measured. No identifying student data was submitted. The test suite does not use a real credential.
- **Human content approval is pending.** Teacher review, first-aid professional sign-off and page-by-page source proofreading remain outstanding. The course includes corrections from the 15 October 2026 Finnish CPR guideline and checked SPR instructions, with explicit editorial notes. See `SOURCE_REVIEW.md`.
- Offline written grades are explicitly self assessments. Local progress/backups are editable, not authenticated academic records. The exam bank is finite, not an unlimited question generator.
- Physical iOS/Android installation, Safari/Firefox, hosted HTTPS deployment, multi-process rate-limit infrastructure and GitHub-hosted CI were not executed in this session. A verification workflow is provided for subsequent repository integration. No claim of remote CI approval or merge is made.

## Additional learning-progress QC — 25 October 2026, afternoon

A reproduced screenshot blocker (the nine-character "En tiedä?" could not satisfy a ten-character minimum) led to a full learner-path audit. See [Learning QC](LEARNING_QC.md) for root cause, remediation, and regression matrix.

Verified on the final source:

- npm run typecheck: passed.
- npm run lint: passed with no warnings.
- npm run validate:content: passed (13 sections, 52 lessons, 104 choices, 52 recall plus 52 application tasks, and 26 exam-bank items).
- npm test: **57 tests passed** across 6 files.
- npm run build: passed, with the offline service worker and 19 precached resources.
- PLAYWRIGHT_CHANNEL=chrome npm run test:e2e: **36 browser tests passed**, including the original 20 and 16 new desktop/mobile regressions. The added suite completed the entire 52-lesson novice path on desktop, sampled 14 on mobile, and tested reloading short responses, skipping questions, safe revival of unusual saved state, honest revision scoring and WCAG checks at the new stages.
- npm audit: found **0 vulnerabilities**.

The production-browser suite uses a deliberately blank Muse API credential; this pass did not make paid provider calls. Previous separate live connection/structured-grading checks remain as recorded above. No teacher-calibrated exam performance or physical-device Safari testing is claimed.

## Pre-test release review — 25 October 2026 (supersedes provider status above)

**Final complete verification command:** PLAYWRIGHT_CHANNEL=chrome npm run qc:pretest. It succeeded with exit code 0.

| Check                            | Verified result                                                                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| TypeScript                       | Passed                                                                                                                          |
| ESLint, zero warnings            | Passed                                                                                                                          |
| Curriculum structure             | 13 sections, 52 lessons, 104 objective questions, 52 recall tasks, 52 written application tasks, 26 exam tasks                  |
| Unit and server integration      | **73 passed in 7 test files**                                                                                                   |
| Production PWA build             | Passed; 19 precached entries, approximately 750 KiB                                                                             |
| Release-artifact inspection      | Passed; no Meta API endpoint, provider key or source PDF in the browser/server distribution                                     |
| Chrome Playwright desktop/mobile | **44 passed**, including 52-lesson novice journey, accessibility, offline reload, exam workflow and newly added pre-test checks |
| Responsive design                | Tested 320, 360, 390, 430, 768, 1024 and 1440 px                                                                                |
| Dependency audit                 | **0 vulnerabilities reported**                                                                                                  |

This pre-test review discovered a substantive underage-access issue with the formerly connected Meta Model API: the provider's 9 October 2026 terms prohibit integrated products targeted at minors. This was not caught by prior functional testing. It is now removed from the student runtime and forbidden by the release-artifact validator. The backend uses an **optional** OpenAI API path with age-aware system instructions, input/output moderation that fails closed, explicit fresh consent, and server-only credentials. Existing Muse-era consent is revoked while historical study progress is preserved.

**An OpenAI API key is not configured or live-tested on the local machine.** Successful historic Muse responses noted earlier in this document are not evidence that the new provider is operational. A full AI-enabled 14-year-old pilot is therefore NOT READY. Browser regression tests deliberately use an empty API key and mocked safety refusals, not paid AI completions.

See [PRETEST_QC.md](PRETEST_QC.md) for the conditional usability-pilot decision, tester procedure and remaining gates. The 44 tests are Chrome desktop/mobile emulation only; they do not replace Safari, assistive-device, real-user, teacher-calibration or qualified first-aid review.
