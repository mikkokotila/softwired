# Softwired — written-response feedback

## What was missing

The lesson recall and application fields only saved a written response and exposed
an example/model with a checkbox rubric. The student got no visible explanation
responding to the text they had entered. In the mock exam, the written rubric
required an extra click and was easily missed.

## Current experience

Every free-text answer now receives a **Palaute vastauksestasi** response:

- **Recall:** Immediately after locking an answer, the student gets short
  syllabus-grounded formative feedback, model answer, and interactive
  self-check criteria.
- **Application:** After locking the answer, the learner sees an immediate
  offline check and a topic-specific next step, while the model answer stays
  hidden until the explicit **Vertaa itse malliin** choice.
- **Revision:** After the two comprehension checks, the original free-text
  answer receives the same feedback and the existing score-controlled
  self-assessment, without inventing mastery.
- **Mock-exam results:** Every written response gets a visible feedback panel
  by default; the rubric/model can be opened for self-marking.

The local analyzer can recognise **"En tiedä"**, a blank answer, a very short
answer, or a substantial answer. It can spot shared word roots with the author-
written model and use the per-question rubric to suggest what to review next.
It preserves Finnish characters in displayed terms. These heuristic matches
are about vocabulary only — **not correctness, semantic equivalence, reasoning,
factual truth, or a grade**. A negated sentence can use the same vocabulary
as a correct answer, so the UI explicitly disclaims automatic scoring.

The rubric remains authoritative; the student's checkbox selections generate
a personal next-step message and, only where already supported, a clearly
self-assessed score. Answers are processed locally and aren't transmitted to
an AI service by this feature. The public production API remains deliberately
disabled until an age-appropriate AI deployment is configured and tested.

## Scope and test coverage

Unit tests cover all 117 authored written tasks, no-answer/unsure/brief,
shared vocabulary, negated incorrect statements, and avoiding fake marks.

Playwright desktop/mobile tests exercise the complete lesson recall and
application feedback, student checkbox updates, revision, all written exam
results, saved progress across reloads, 320px layout and WCAG A/AA rules.

A separate adult-only review harness has verified real
muse-spark-1.3-contributor model grading using fictional samples. The current
Meta Model API terms prohibit its use by the 14-year-old learners this public
app is designed for. This offline feature is explicitly _not_ that model;
teacher-calibrated real-time grading for minors remains unavailable.
See MUSE_MODEL_DECISION.md.
