Historical initial implementation brief: its references to Muse Spark are superseded by the pre-test QC. See README.md and docs/PRETEST_QC.md for current provider decisions and restrictions.

# SOFTWIRED — FULL PRODUCT BUILD SPEC (2026-10-25)

## Goal

Build a production-quality, mobile-first, offline-capable Finnish study web app/PWA for a 14-year-old taking a TERVEYSTIETO 8 exam. An assigned 65-page scanned PDF is the syllabus. The app must teach the syllabus completely _without requiring the student to read the original textbook_, assess recall and transfer, and help produce high-mark free-form written answers. A real frontier AI tutor is the central differentiator. Don't build a mock chatbot or call AI "connected" if there's no API key. Build a real secure server-side Meta Model API integration using an OpenAI-compatible Responses API with model default `muse-spark-1.3-contributor`, configurable via environment; the key may be absent on other machines; this Mac uses an ignored local key file. The UI reports the configured state without exposing the key.

## Local paths and access

Project directory: ~/dev/softwired (new empty git repo).
Authoritative source scan: the author-owned local source scan (not included) (65 scanned pages, Hipppokrates / Yläkoulun terveystieto 8). YOU MAY inspect/derive from it. DO NOT commit/copy original full PDF into GitHub repo; keep private, generate optional .local page snapshots and .gitignore. The student-facing course must contain self-sufficient lessons with actual teaching, not only quizzes; original source is optional contextual reference.
Important: PDF pages are images (pdftotext likely blank); don't assume machine-extracted text is complete. Do not present incomplete extraction as verified.

## Course source map; exact PDF positions (1-based) and textbook pages

- 1.1 Kun mieli voi hyvin: PDF 1–4, book pp. 8–11.
- 1.2 Perhe, rakkaus ja itsenäistyminen: PDF 5–8, book pp. 12–15.
- 1.4 Kriisit ja psyykkinen ensiapu: PDF 9–12, book pp. 20–23.
- Intro pages for chapter 5: PDF 13–14, book 64–65.
- 5.1 Riippuvuus – mielihyvästä mielipahaa: PDF 15–17, book pp. 66–68.
- 5.2 Arvaamattomat huumausaineet: PDF 18–23, book pp. 69–74.
- 5.3 Sosiaaliset paineet ja nuorten päihteiden käyttö: PDF 24–26, book pp. 75–77. Historic plots through 2014; explicitly historical, not current.
- Chapter 6 intro: PDF 27, book 79.
- 6.1 Ravintoaineet ja energiantarve: PDF 28–35, book pp. 80–87.
- 6.2 Kaikki eivät voi syödä kaikkea: PDF 36–39, book pp. 88–91.
- 7.3 Liika istuminen on terveysriski: PDF 40–43, book pp. 102–105.
- Chapter 8 intro: PDF 44, book 107.
- 8.1 Sinusta voi tulla hengenpelastaja: PDF 45–49, book pp. 108–112.
- 8.2 Elvyttämällä happea aivoille: PDF 50–54, book pp. 113–117.
- 8.3 Sairauskohtaus voi yllättää: PDF 55–59, book pp. 118–122.
- 8.4 Verenvuoto: PDF 60–62, book pp. 123–125.
- Sanasto: PDF 63–65, book pp. 126–128, integrate vocabulary throughout.

## Learning blueprint and content specifics

Every section needs multiple complete micro-lessons, each with title, hook/scenario, main teaching in age-appropriate Finnish (multiple paragraphs, comprehensible precise vocabulary), visualizable explanation / comparison / steps, examples, key terms with definitions, one recall question, at least two distinct multiple-choice/interaction tasks with plausible misconceptions and explicit explanations, one application/written-answer task + model response/rubric for offline self-review, and textbook-page reference. Target >=52 lessons and >=104 objectively scored questions, distributed reasonably across all 13 sections. Don't use generic fill-in placeholders, repeated canned questions, or topic-only titles. Build a validator/test that fails if coverage is incomplete. Lesson definitions and assessments can live in TypeScript modules / JSON, separate from React UI. If 52 real lessons is too broad for one pass, favor fewer genuinely complete lessons but document exact shortfall honestly; do not inflate counts via duplicate generated templates.

Scientific scope / textbook framing:
1.1 Mielenterveys / hyvinvointi, emotional skills, mood, self-esteem, healthy routines, strengths and protecting/weakening factors, belonging, perseverance.
1.2 Different families, biological/legal/social parenthood, custodial rights/duties, love and trust, communities and growing independence.
1.4 Development, life, acute crises; shock, reaction, processing, reorientation; psychological first aid and listening/safety.
5.1 Brain's reward response, substance and behavioral addiction, psychological/physical/social dependence, tolerance, withdrawal, cycle of reinforcement.
5.2 Huumausaineet, CNS depressants (e.g. opiates), stimulants, hallucinogens, cannabis, harms, poor predictability and why drug myths mislead; avoid hazardous specifics; separate old legal facts from current.
5.3 Smoking, alcohol and adolescents, peer/social pressure, refusing assertively, long-term health effects, interpreting historical graphs from 1986–2014.
6.1 Energy balance and need, proteins building/repair, carbohydrates as energy, slow/fast forms and fiber, saturated/unsaturated fats, micronutrients incl calcium, iron, C and D, varied diet.
6.2 Allergy vs intolerance, celiac autoimmune reaction to gluten, lactose intolerance enzyme issue, dietary accommodation, vegetarian/vegan planning B12/protein/iron/D.
7.3 Long sitting time, nonexercise activity, ergonomics and posture, ways to add breaks, effects.
8.1 scene safety, emergency number 112 in Finland, correct emergency call details, safe rescue from water without putting rescuer in danger, hypothermia and first response.
8.2 recognize unresponsiveness & abnormal breathing, 112, CPR and AED, recovery position if breathing normally, child variation. CRITICAL: older book may differ; do not invent authoritative medical instructions. Add clearly labeled contemporary guidance caveat and configurable medical editorial notes.
8.3 Stroke F.A.S.T., asthma, seizures, diabetic low blood sugar, symptoms, safe choices and calling 112.
8.4 Bleeding types and direct pressure, safety, protection, hemorrhagic shock, help.
Sanasto: integrate glossary throughout course.
Study questions should train Finnish exam command verbs: määrittele, kuvaile, selitä, vertaile, perustele, sovella, arvioi. Prioritize independent answer before hints and provide reasoned rubrics.

## UX / design

High-polish, intentional and distinctive youthful but not childish, "KIPINÄ" study product. Visual direction: deep ink/navy surfaces, off-white editorial panels, electric yellow-green accents and lilac details; rounded elevated cards, subtle gradients, expressive typography, strong contrast; responsive sidebar desktop and bottom navigation mobile. Finnish-language UI end-to-end. Clear onboarding, dashboard Today, Course Map, Practice/Review, Mock Exam, Tutor, Progress/Insights, Settings. A 20-minute focused daily session path. Include streak only if not punitive, no addictive loops. Accessible keyboard controls, focus states, prefers-reduced-motion, touch targets.

Lesson player genuinely interactive stages: challenge (hook) -> teach -> recall free-text -> checked practice -> applied written question -> summary and scheduled review. Need show feedback/explanation and next step, never reveal answers accidentally before attempt. Track each objective's demonstrated status (seen vs practiced vs mastered) distinctly. Mastery is NOT awarded for one lucky multiple choice; require independent performance (delayed recall or AI-graded transfer). Offline self-marking explicitly labeled as such (no fake AI).

Adaptive review / analytics: local persistence with export/import backup. Spaced repetition due dates with correct/incorrect/confidence, interleaving, mastery by objective. Review queue and wrong-answer rescue; repeated mistakes get targeted short explanations. No backend account needed.
Mock exam: mixed novel questions across 13 areas, 15min/40min presets, timer, results and personalized gap list; include written answers. Without AI, show self-assessment rubric, not fake scores; with AI, grade actual written responses using secure backend.
AI tutor: mode explain / hint (Socratic, avoid spoiling pre-attempt) / grade (rubric-based JSON feedback 0..4 per question) / dialogue (age appropriate, evidence grounded). Accurate no-citation invention. Server assembles TRUSTED lesson context only, never takes client-provided textbook context at face value. Constrain user text lengths; prevent prompt injection via user text. Avoid encouraging disclosure of personal sensitive experiences. API errors show actionable state, request timeout, rate limiting, no API key in frontend. Response API with store:false and named model muse-spark-1.3-contributor from env. Implement proper injection-resistant JSON feedback schema or robust parser. Prefer server-only key config from .env. Explicit AI consent banner explaining prompts and answers go to model provider if connected. AI as guided teaching, not unrestricted answer dispenser. Include transparent estimated per-call cost or model label / paid API note in settings. Do not silently downgrade frontier model.
Source grounding: attach section/lesson text + page reference to AI prompt. If feasible render original pages into ignored local .local/source-pages or include optional on-demand vision for page-grounded questions; do not depend on PDF for core offline lesson use. No hallucinated textbook quotations.
PWA: installable, offline lessons, no credentials in static build. Secure dev proxy.

## Implementation expectation

Use React + TypeScript + Vite + CSS (or Tailwind if you prefer), Node API server Express/Fastify + OpenAI official SDK, localStorage/IndexedDB with migration-safe state, vite-plugin-pwa. Keep code clean, modular, typesafe. package scripts: dev, build, test, lint/typecheck, serve. Docs README + .env.example + LICENSE consideration, .gitignore secrets/source PDF. Test curriculum integrity, mastery algorithm, offline states and server validation; do actual pnpm install/build/tests and fix failures. If Playwright or browser available, inspect UI and fix issues. No placeholder components. Do NOT automatically start paid API calls.

## Delivery and quality bar

Produce the actual runnable code in this project, not a plan. Don't ask for clarification. Use all 13 sections. The student must be able to prepare without separately reading the scan. Demonstrate zero-API-key fallback clearly as 'AI odottaa avainta', not mock AI. Record any source gaps and required human quality review. At end list exact verified commands/results and any blockers. Do not push code automatically; main agent will handle git/GitHub.

Proceed with implementation now.
