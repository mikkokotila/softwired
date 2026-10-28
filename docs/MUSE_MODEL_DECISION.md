# Muse Spark 1.3 Contributor — exact model and age boundary

Updated 28 October 2026.

## Immutable model

One and only one model is selected in source:
muse-spark-1.3-contributor

The API is https://api.meta.ai/v1. The private adult evaluator
constructs the OpenAI-compatible SDK with this fixed URL and model ID,
maxRetries=0, store=false, strict response JSON and no fallback.
Returned model IDs are verified; anything else causes a hard failure.
There is no configurable model selector or alternate provider.

The existing developer API credential is read server-side from the
muse_api_key entry in ~/.env. No credential is stored in GitHub or in
the public Pages bundle. Do not log or upload it.

## Verified actual provider operation

A live request with a **fictional** Finnish written-answer sample
returned exact model muse-spark-1.3-contributor, score 2/4,
two strengths, two improvements and a follow-up question. The private
browser-based developer review UI independently submitted the same kind
of fictional evaluation and received model-generated grading.
These are actual Meta Model API calls, not mocks or keyword analysis.

The results verify connectivity/response structure; they are NOT
teacher-calibrated grading accuracy.

## Critical Meta restriction

Meta Model API Terms of Service last updated 9 October 2026,
section 10.1, require users and end users to be at least 18 and
prohibit Integrated Products targeted at individuals under 18.

https://dev.meta.ai/legal/terms-of-service

Meta's Contributor support material also prohibits personal,
sensitive and confidential data and permits submitted text to be
used in future model training.

https://dev.meta.ai/help/policies-and-privacy/contributor-tier

Softwired is designed for a 14-year-old student. Therefore the exact
Muse model MUST NOT be exposed through public student API endpoints.
Student /api/status shows this explicitly and /api/tutor refuses calls.
No consent UI can override those third-party terms. The private adult
developer evaluation is separate and must not be supplied to minors.

If Meta provides **express written permission** for a minor-facing
product, the owner can reassess the contract and implement separate
identity/age controls, anti-abuse limits, costs and content moderation
before authorizing a student endpoint. No such exception has been
supplied or assumed.

## What is still missing from the original desired experience

A student-visible, real-time personalized AI tutor powered by this
specific model is not available under the current provider terms.
The student's authored study course and rubric-grounded offline
self-review work. They are not a substitute for actual model grading,
and are never represented as live AI responses.
