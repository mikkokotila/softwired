> Current provider policy: the sole selected model is
> muse-spark-1.3-contributor, but Meta Model API does not permit
> Integrated Products targeted at under-18s. The public student API
> is explicitly blocked. A local private adult reviewer tests the real
> model. See MUSE_MODEL_DECISION.md.

# Softwired · Cloudflare Pages public pilot

Host: https://softwired.mikkokotila.com
Repository: https://github.com/mikkokotila/softwired
Cloudflare account: the Cloudflare account containing mikkokotila.com
Cloudflare Pages project: softwired

## Continuous deployment

Cloudflare Pages is configured with GitHub as its repository source, but automatic
GitHub-triggered deployments have **not** started working: as checked in
Cloudflare deployment history, only manually uploaded (ad_hoc) releases exist.
This is a separate release blocker for unattended deployment; do not claim
merge-to-deploy is operational until an actual push produces a Git-triggered
Cloudflare deployment.

- Production source: GitHub mikkokotila/softwired, branch main.
- Build command: npm run build:pages
- Output directory: dist
- Root directory: /
- Node runtime: 24
- Cloudflare Pages Functions: functions/api/status.ts, functions/api/tutor.ts and functions/api/unlock.ts
- Intended behavior: every push or merge to main builds and deploys production; PRs may get previews. **Currently unverified and not operating**.
- Cloudflare's GitHub App must be authorized for the mikkokotila/softwired repository. On GitHub, go to Settings > Applications > Installed GitHub Apps > Cloudflare Workers and Pages > Configure > Repository access and include softwired. Check Pages > softwired > Settings > Builds > Git Repository. Re-push a safe commit to validate and confirm Cloudflare reports a Git-triggered deployment rather than ad_hoc.
- If GitHub App linking cannot be repaired, use an explicit GitHub Actions Wrangler deployment backed by a scoped Cloudflare Pages Edit API token stored in GitHub Actions secrets. Never commit the token or publish OAuth session credentials.
- The Verify app GitHub workflow separately runs curriculum, unit, accessibility and browser tests. Cloudflare Pages Git integration does not automatically wait for GitHub tests to pass; require green checks before merging.

## Public course and AI

The public pilot has no student-facing live AI. Pages Functions return
configured=false with model=muse-spark-1.3-contributor for /api/status.
The /api/tutor endpoint returns HTTP 403 due Meta's age terms;
the unused /api/unlock endpoint returns 503. This avoids accidentally exposing a paid API to the entire internet.

The old local Node/Express service is retained for development and future properly gated integrations. Merely adding MUSE_API_KEY to Cloudflare Pages must NOT turn student AI on. A future AI release requires age-appropriate usage review, secrets configured outside Git, server-side authentication, a durable request/cost limiter, appropriate moderation and a live integration verification.

Lessons, revision, mock exams and local progress work without any server-side credentials. Exam answers and course state are stored only in each browser's local storage. There is no cross-device synchronization. Avoid clearing site data without exporting a backup.

## Public distribution and source rights

Only independently authored lesson explanations and questions are published. The original 65-page textbook scan, source OCR, local images, internal logs and secrets are excluded. A public GitHub repository does not grant an open-source license or waive the publisher's copyright. See LICENSING.md and obtain the necessary rights review before broader public promotion.

## Verification

Use npm run build:pages for static assets.
Run npx wrangler pages dev ./dist --port 8799 to test the Pages Functions locally.
Confirm /api/status returns JSON and configured=false with the locked Muse model, /api/tutor rejects POST with 403, the PWA manifest exists, and offline lesson pages load after a cached first visit.

The public site is configured with X-Robots-Tag: noindex during the pilot. The site is publicly reachable to anyone with its URL; this is not an access-control mechanism. For a private student test, use Cloudflare Access and provide an authenticated tester identity.

Production Pages project: softwired (Git-connected main). Custom domain: softwired.mikkokotila.com.

Initial Cloudflare Pages production deployment verified at softwired.mikkokotila.com (HTTP 200). Automatic Git-triggered deployment is being verified separately.

## Installed PWA upgrade policy

In the October 25 update, the previous PWA was using prompt-based service
worker upgrades, with the only effective apply button hidden in Settings.
That can leave an installed browser showing the old Kipinä UI even after
Cloudflare serves the Softwired build.

The upgrade fix uses autoUpdate, skipWaiting and clientsClaim; the app also
checks for new service workers when a tab gains focus and periodically while
open. Cloudflare sends no-store/no-cache headers for /sw.js and revalidation
headers for the application shell and manifest. Hashed assets remain safely
cacheable. The change preserves the existing kipina.study.v2 storage key for
study-history compatibility; it does not clear browser storage.

Regression coverage: e2e/service-worker-upgrade.spec.ts emulates a browser
controlled by a legacy Kipinä service worker, upgrades it to Softwired, and
verifies the old progress and theme remain intact. A fresh browser origin,
for example softwired.pages.dev, can be used for a quick cross-check if an
older installed PWA has not yet checked for its newer worker.
