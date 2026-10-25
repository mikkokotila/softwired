# Learning-journey quality audit — 25 October 2026

## Reported release blocker and root cause

Recall on lesson 1.1-3 (itsetunto ja minäkuva) was not navigable after a student entered "En tiedä?". The input has nine characters, while the button was disabled for all attempts shorter than ten. The same assumption prevented moving on from application tasks shorter than twenty characters and from short responses in the separate revision experience. The gates confused answer length with learning readiness.

## Corrections

- Any nonempty recall or application attempt, however short, can be submitted. Empty fields keep primary submit disabled, but always offer an explicit "En osaa vielä" path.
- Both checked questions in every lesson allow "En osaa vielä – katso perustelu", revealing a verified explanation and allowing progression without guessing.
- Admitting uncertainty (including "En tiedä?") shows model teaching and schedules further learning. Such attempts and revealed answers do not create successful independent-choice or AI-transfer evidence.
- Revision sessions support unknown recall and skipped quiz responses. A completely unknown recall is recorded at 0/4 without pretend success; if either checked revision question is wrong, a subsequent self-rating is capped at 2/4. The student can continue and is scheduled to review again.
- The application stage permits "I don't know yet" without inventing a written answer or exposing it to AI grading; the student can read the rubric and finish as practised, not mastered.
- Previously saved quiz-answer data uses -1 for "not yet known", a valid stored response. Even an out-of-range old quiz index (2, when only positions 0 and 1 exist) is clamped in the UI so that an imported/restored draft cannot display an empty step.
- The original learning state key and schema version remain unchanged, and existing progress is preserved.

## Automated regression matrix

| Scenario                                                                   | Browser validation                                                                 |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Screenshot response "En tiedä?" at lesson 1.1-3                            | Desktop/mobile; can submit, resume after reload, receive teaching, finish honestly |
| Blank recall, two unknown checked questions, blank application             | Desktop/mobile; finishes with no independent mastery                               |
| Short, genuine recall and written application                              | Desktop/mobile; submits despite former thresholds                                  |
| Delayed revision with unknown recall and questions                         | Desktop/mobile; records 0/4 and schedules next practice                            |
| Incorrect checked revision answer followed by 4/4 self-rating              | Desktop/mobile; caps recorded score at 2/4                                         |
| All 52 authored lessons                                                    | Desktop: full novice-path walkthrough; mobile: 14 representative lessons           |
| Recoverable restored quiz-index anomaly                                    | Desktop/mobile; no blank unprogressable step                                       |
| Accessibility on new novice-path stages                                    | Desktop/mobile automated WCAG A/AA checks                                          |
| Existing exam, offline, consent, navigation, saved state, and lesson tests | Existing browser suite                                                             |

Unit tests cover short-answer classification, uncertainty cues, saved -1 quiz state, and lack of false mastery. Browser tests run against a production build with an empty Muse API key and make no paid model requests. The separately verified live Muse explanation/grading contracts were unchanged by this fix.

## Test harness note

A test that writes directly to localStorage after onboarding must perform a full page reload before hash navigation. Otherwise the still-running React provider retains its original in-memory state and can overwrite the artificial fixture. The browser harness was corrected; this was not an additional student-facing defect.

## Remaining limits

- Automated mobile mode uses an emulated Chrome viewport, not a physical iPhone/iPad or Safari. Manual device testing and assistive-technology testing remain desirable.
- AI grading accuracy relative to the teacher's marking scheme remains unvalidated. This pass verified progression and the absence of fabricated completion/mastery, not school-grade prediction.
- Source-by-source teacher review and first-aid editorial sign-off remain outstanding.
