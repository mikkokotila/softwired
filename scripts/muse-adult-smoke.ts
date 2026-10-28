/**
 * Adult developer smoke test. Uses ONLY a fictional prompt, and does not log
 * credentials or user data. Requires confirmed adult use.
 */
import { readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { parse as dotenvParse } from "dotenv";
import {
  createMuseContributorAdultReviewer,
  MUSE_CONTRIBUTOR_MODEL,
} from "../server/muse-contributor-review";

if (process.env.MUSE_ADULT_REVIEW !== "YES") {
  console.error(
    "This is an adult-only developer test. Set MUSE_ADULT_REVIEW=YES only if you are 18+.",
  );
  process.exit(2);
}
const homeEnv = dotenvParse(readFileSync(path.join(os.homedir(), ".env")));
const apiKey = process.env.MUSE_API_KEY || homeEnv.muse_api_key;
if (!apiKey) throw new Error("No Muse API key available");
const review = createMuseContributorAdultReviewer(apiKey);
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 55_000);
try {
  const result = await review(
    {
      adultConfirmed: true,
      syntheticContentConfirmed: true,
      lessonId: "1.1-1",
      task: "application",
      mode: "grade",
      message:
        "Yksi huono päivä ei yksin kerro mielen hyvinvoinnin tilasta. Mieliala voi vaihdella, ja jos vaikeudet jatkuvat, turvalliselta aikuiselta voi pyytää apua.",
      history: [],
    },
    controller.signal,
  );
  if (result.model !== MUSE_CONTRIBUTOR_MODEL) throw new Error("WRONG_MODEL");
  console.log(
    JSON.stringify(
      {
        verified: true,
        provider: result.provider,
        exactModel: result.model,
        score: result.score,
        strengthsCount: result.strengths.length,
        improvementsCount: result.improvements.length,
        hasFollowup: Boolean(result.nextQuestion),
        replyExcerpt: result.reply.slice(0, 220),
      },
      null,
      2,
    ),
  );
} catch (error) {
  const e = error as { status?: number; code?: string; name?: string };
  console.error(
    "Muse live test failed",
    JSON.stringify({
      status: e.status ?? null,
      code: e.code ?? null,
      name: e.name ?? null,
    }),
  );
  process.exitCode = 1;
} finally {
  clearTimeout(timeout);
}
