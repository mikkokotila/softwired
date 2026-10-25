# Cloudflare Pages public pilot

Host: https://softwired.mikkokotila.com
Repository: https://github.com/mikkokotila/softwired
Cloudflare account: the Cloudflare account containing mikkokotila.com
Cloudflare Pages project: softwired

## Continuous deployment

The project uses the first-party Cloudflare Pages GitHub integration, not GitHub Actions with a separately stored Cloudflare token.

- Production source: GitHub mikkokotila/softwired, branch main.
- Build command: npm run build:pages
- Output directory: dist
- Root directory: /
- Node runtime: 24
- Cloudflare Pages Functions: functions/api/status.ts, functions/api/tutor.ts and functions/api/unlock.ts
- Every push or merge to main triggers a new production build and deployment. Pull-request branches can receive Cloudflare preview URLs (if enabled).
- The Verify app GitHub workflow separately runs curriculum, unit, accessibility and browser tests. Cloudflare Pages Git integration does not automatically wait for GitHub tests to pass; require green checks before merging.

## Public course and AI

The public pilot has no live AI. Pages Functions intentionally return configured=false for /api/status and HTTP 503 for /api/tutor and /api/unlock. This avoids accidentally exposing a paid API to the entire internet.

The old local Node/Express service is retained for development and future properly gated integrations. Merely adding OPENAI_API_KEY to Cloudflare Pages must NOT turn the pilot API on. A future AI release requires age-appropriate usage review, secrets configured outside Git, server-side authentication, a durable request/cost limiter, appropriate moderation and a live integration verification.

Lessons, revision, mock exams and local progress work without any server-side credentials. Exam answers and course state are stored only in each browser's local storage. There is no cross-device synchronization. Avoid clearing site data without exporting a backup.

## Public distribution and source rights

Only independently authored lesson explanations and questions are published. The original 65-page textbook scan, source OCR, local images, internal logs and secrets are excluded. A public GitHub repository does not grant an open-source license or waive the publisher's copyright. See LICENSING.md and obtain the necessary rights review before broader public promotion.

## Verification

Use npm run build:pages for static assets.
Run npx wrangler pages dev ./dist --port 8799 to test the Pages Functions locally.
Confirm /api/status returns JSON and configured=false, /api/tutor rejects POST with 503, the PWA manifest exists, and offline lesson pages load after a cached first visit.

The public site is configured with X-Robots-Tag: noindex during the pilot. The site is publicly reachable to anyone with its URL; this is not an access-control mechanism. For a private student test, use Cloudflare Access and provide an authenticated tester identity.

Production Pages project: softwired (Git-connected main). Custom domain: softwired.mikkokotila.com.

Initial Cloudflare Pages production deployment verified at softwired.mikkokotila.com (HTTP 200). Automatic Git-triggered deployment is being verified separately.
