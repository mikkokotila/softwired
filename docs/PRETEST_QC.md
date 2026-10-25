# Kipinä — pre-test release quality review

Date: 25 October 2026. Location: ~/dev/softwired. Audience: a 14-year-old Finnish health education student.

## Release decision

**Offline usability pilot: CONDITIONAL GO on the host Mac.**

**Full tutor-enabled 14-year-old pilot: NO GO until the below external dependencies are resolved.** Automated tests alone cannot establish educational effectiveness, provider compliance, or curriculum completeness for a particular teacher's exam.

### Blocking or conditional items

| Severity                                 | Finding                                                                                                                                                                                                                  | Mitigation and present status                                                                                                                                                                                                                                   |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Critical, resolved in code               | Meta Model API / Muse Contributor terms require users to be 18+ and prohibit under-18-targeted integrated products. An earlier version routed this 14-year-old learning product to Meta.                                 | Meta endpoint removed from student runtime. Backend now targets OpenAI Responses API only. Old Meta consent is reset without deleting work. New release-artifact check prevents reintroduction of the Meta endpoint. Do not use the old Muse key for the minor. |
| Blocker for full AI pilot                | There is no configured or live-tested OpenAI API key on this Mac. A ChatGPT subscription is not an API credential.                                                                                                       | Offline lessons, revision and exams work. Full AI tutoring requires separately configured OpenAI API billing/key and live end-to-end validation under the under-18 guidance. Never use mock tutor output as real AI.                                            |
| Blocker for off-device independent pilot | The development and production servers bind to localhost. The URL on this Mac is not accessible from another device.                                                                                                     | Provision an HTTPS pilot with a valid exact APP_ORIGIN, strong APP_ACCESS_TOKEN and stable SESSION_SECRET, or supervise the pilot on the same Mac. Do not publish the Vite dev server. No public deployment has been performed.                                 |
| Editorial gate                           | Original material is a 65-page image-only textbook packet; all 13 mapped sections are represented, but automated structural validation does not prove that every examinable detail is taught well enough for high marks. | Teacher must review objectives, answers, historical chart facts, vocabulary and marking rubrics against the actual exam requirements.                                                                                                                           |
| Safety/editorial gate                    | CPR, water rescue, bleeding and disease episodes are high-stakes instructional topics; the old textbook may differ from updated first-aid guidance.                                                                      | Clearly label educational content; emergency instructions and CPR deviations already carry warnings. Obtain qualified first-aid editorial approval.                                                                                                             |
| Residual environment risk                | Real iPhone, Safari, assistive technologies and cloud-hosted deployment have not been exercised here.                                                                                                                    | Chrome desktop and emulated mobile/320px-1440px layouts are tested; physical-device acceptance still needed.                                                                                                                                                    |
| Residual pedagogical risk                | AI numerical grading and self-assessed mastery have not been calibrated against real teacher-marked exam responses.                                                                                                      | Treat scores as learning feedback, not grade predictions. Verify before promising 9/10 exam outcomes.                                                                                                                                                           |

## Scope and checks

- Source coverage: 13 sections; 52 lessons; 104 authored checked questions; 52 recall + 52 written application tasks; 26 mock-exam tasks.
- Tested interaction paths: onboarding, navigation, every lesson's no-knowledge exit, short answers, progress resumption after reload, lesson completion, practice review and mastery evidence, mock exam timer/expiry/scoring, backup import/export and corruption handling, tab/focus behavior, updates and offline reload.
- Security and privacy: same-origin and CSRF controls, cookie access gating, rate limits, bounded messages, server-only credentials, safe provider errors, no Meta endpoint or source PDF in distribution, new-provider consent migration preserving coursework, no automatic billable requests in test suite.
- AI safety: age-aware instruction constraints, server-curated teaching context, pre-/post-completion moderation with fail-closed handling, no persisted student chat, 112/trusted adult redirection for flagged imminent danger, tests with mock provider only.
- Performance/layout: self-hosted fonts, local PWA precache, desktop and emulated mobile layouts including narrow 320px viewport. Automated color contrast and keyboard-navigation checks do not replace manual assistive technology testing.
- Result: see docs/VERIFICATION.md for exact commands and latest test counts after the final full run.

## Test-user session protocol

Use a distinct browser profile so the tester never overwrites someone else's progress. Do not reset existing data without exporting a backup.

Ask the tester to work for 20-30 minutes in Finnish. A supervising adult should observe without supplying answers.

1. Start at the home screen, choose a new lesson and explain in the tester's words what was learned.
2. Use a real short answer, then use "En osaa vielä" and check that help and progression work without pretending mastery.
3. Reload during a written answer and confirm it resumes.
4. Finish a short lesson, inspect the feedback and identify what should be revised.
5. Attempt a 15-minute practice exam, including written answers, without looking up results early.
6. Try changing text size, keyboard-only navigation and mobile view where available. Do not use personally identifying answers or sensitive stories.
7. Report which explanations were confusing and whether any important textbook facts appear absent.

Ask for feedback about confusing terms, too much text, unintuitive navigation, teacher-style answer depth, motivation and sense of exam readiness. Record the lesson ID and stage for bugs. Do not share student answers, names, health conditions, location or API keys in screenshots or issue reports.

### Stop and report

Stop the test if progress disappears, an answer cannot advance, the AI displays a personal emergency as routine exam content, a page unexpectedly exposes another student's work, or an error repeats after refresh.

## Sources and decisions

- Meta Model API Terms of Service, last updated 9 October 2026: https://dev.meta.ai/legal/terms-of-service
- Meta Contributor guidance: https://dev.meta.ai/help/policies-and-privacy/contributor-tier
- OpenAI guidance for applications serving minors: https://developers.openai.com/api/docs/guides/safety-checks/under-18-api-guidance
- OpenAI API data controls: https://developers.openai.com/api/docs/guides/your-data
- Existing source-review findings: docs/SOURCE_REVIEW.md
- Earlier complete learning-flow audit: docs/LEARNING_QC.md

Not legal advice; confirm platform terms, age safeguards, and privacy compliance before production.
