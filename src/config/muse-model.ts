/**
 * THE ONLY SELECTED LLM FOR SOFTWIRED EVALUATION.
 * Meta Model API prohibits integrated products targeted at people under 18.
 * Real calls are only available from the private, adult-only review harness.
 * Public student endpoints deliberately fail closed.
 */
export const MUSE_CONTRIBUTOR_MODEL = "muse-spark-1.3-contributor" as const;
export const MUSE_API_BASE_URL = "https://api.meta.ai/v1" as const;
export const MUSE_PROVIDER_NAME = "Meta Model API" as const;
