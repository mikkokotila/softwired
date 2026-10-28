# SOFTWIRED

Finnish-language Terveystieto 8 exam preparation, built as a mobile-first
offline-capable Progressive Web App with a tokenized Command Center UI.
Source scan, local credentials, browser-progress backups and private data
are not committed or distributed.

## Essential provider decision

**Only one LLM is selected:** Meta Model API's
**muse-spark-1.3-contributor**. It is hardcoded in
src/config/muse-model.ts and enforced by the private review adapter.
No model-selection environment variable, alternate provider, or silent
fallback is allowed in the production configuration.

**Meta's current terms prohibit integrated products targeted at people
under 18 and prohibit submitting personal information to Contributor
services.** This conflicts with Softwired's 14-year-old audience. The
public student version therefore does **not** call this model. Its API
returns a clear age-restriction notice, not simulated AI output. A
parent's permission alone does not override the provider restriction.

A separate **private, adult-only developer evaluation** calls the
actual Contributor model. Two live tests against the provider
verified the exact returned model, real Finnish grading feedback,
rubric points, improvements and follow-up questions. The private
evaluation is not published as a student feature.

### Try the real model privately (developer, 18+)

Prerequisites: Node 24 and a valid muse_api_key entry in your own ~/.env.
Do **not** copy the entire home environment file to the repository.

    npm ci
    MUSE_ADULT_REVIEW=YES npm run muse:adult-review

Open http://127.0.0.1:4397 on the authorized development Mac.
Confirm that you are at least 18 and use **only fictional samples without
names, medical records, addresses, phone numbers, emails or other
personal/sensitive information**. Submitted content may be used by Meta
for training. The credential never goes to the browser; the app binds
only to localhost and uses a request token, input bounds and rate limits.

For a non-interactive live smoke test using a single fictional answer:

    MUSE_ADULT_REVIEW=YES npm run muse:adult-smoke

The private harness supports explanation, hints, dialogue and grading,
with a structured JSON response. Its provider response must report the
exact string muse-spark-1.3-contributor; otherwise the request fails.
It never returns a fallback response from another model.

**Do not use the adult harness with, or send it real work from, students
under 18.** A live Muse integration in Softwired for 14-year-olds would
require express permission from Meta to depart from its published terms.
See docs/MUSE_MODEL_DECISION.md.

## Public study experience

https://softwired.mikkokotila.com

- 13 syllabus sections and 52 fully authored micro-lessons with
  scenarios, teaching, conceptual steps, recall and application.
- 104 multiple-choice questions, 52 written recall tasks, 52 written
  application tasks and 26 authored mock-exam tasks.
- Adaptive spaced revision, progress tracking, explanatory choice
  feedback, saved written answers and timed mock exams.
- Local formative written-answer cues and author-written self-check
  rubrics (NOT semantic correctness grading or AI marks).
- All content works offline after the PWA caches it. Student learning
  history is stored locally in the browser. Export it before clearing
  site data; no cross-device sync is provided.
- Orbit, Nebula and Daybreak visual themes using semantic CSS tokens,
  with user appearance settings separate from study history.

For the historical feedback design and exact limitations, see
docs/WRITTEN_FEEDBACK.md; for content/source accuracy see
docs/SOURCE_REVIEW.md. Teacher review and qualified first-aid editorial
sign-off remain outstanding. Call 112 for actual emergencies.

## Development

    npm ci
    npm run dev

Open http://127.0.0.1:5173. This is the offline student application:
no real provider is enabled on its /api/tutor endpoint.

    npm run build
    npm run serve

The same no-provider student boundary applies to the local production
server. Never paste a provider secret into VITE_ variables, a source
file or the browser.

The original internal localStorage key kipina.study.v2 is intentionally
preserved to prevent data loss during rebrands and updates. It does not
indicate an available alternate model.

## Testing

    npm run validate:content
    npm run typecheck
    npm run lint
    npm test
    npm run build
    npm run check:release
    PLAYWRIGHT_CHANNEL=chrome npm run test:e2e
    npm audit

Browser tests cover the full 52-lesson novice path, exams, progress
restoration, mobile layout, offline PWA upgrades, accessibility,
correct refusal of student AI calls and feedback. Unit tests verify
that the pinned private Muse adapter rejects substituted provider
models and never silently falls back.

## Architecture and deployment

- src/config/muse-model.ts — immutable model designation
- server/muse-contributor-review.ts — real provider adapter, adults only
- private/muse-review.html and scripts/muse-adult-preview.ts —
  localhost-only developer UI with actual model-generated responses
- src/components and src/lib — student lessons and honest offline
  feedback; no student-facing paid provider calls
- functions/api — Cloudflare student status, explicitly age-blocked
  tutor route, no provider credentials
- src/design — semantic tokens, themes and Command Center skin
- docs/DESIGN_SYSTEM.md — theme architecture
- docs/DEPLOYMENT.md — Cloudflare Pages configuration

Cloudflare Pages is hosted at softwired.mikkokotila.com, and source
is public at https://github.com/mikkokotila/softwired.
Git-to-Cloudflare deployment triggering has previously required manual
Wrangler releases; do not assume it is automatically functioning until
the GitHub App connection has been verified. A public GitHub repo does
not itself grant a redistribution license for lesson texts or the
original publisher's material. See docs/LICENSING.md.
