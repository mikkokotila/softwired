import {
  MUSE_CONTRIBUTOR_MODEL,
  MUSE_PROVIDER_NAME,
} from "../../src/config/muse-model";

/**
 * Cloudflare Pages public pilot status.
 *
 * The public pilot intentionally has NO paid AI integration: in particular,
 * configuring a secret in the Pages dashboard does not accidentally enable
 * generation. A reviewed edge implementation with authentication, durable
 * rate limits and under-18 safeguards must be deployed separately.
 */
const headers = {
  "Cache-Control": "no-store, private",
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
} as const;

export const onRequestGet = async () =>
  new Response(
    JSON.stringify({
      configured: false,
      model: MUSE_CONTRIBUTOR_MODEL,
      provider: MUSE_PROVIDER_NAME,
      contributorMode: true,
      verified: false,
      accessRequired: false,
      csrf: "",
      message: "Muse ei ole käytettävissä alaikäisten opiskelijasovelluksessa",
      paidNotice:
        "Muse Spark 1.3 Contributor on ainoa valittu AI-malli, mutta Meta Model API kieltää alle 18-vuotiaille tarkoitetut integroidut tuotteet. Julkisen opiskelijasovelluksen AI on siksi estetty. Älä lähetä henkilötietoja Contributor-palveluun.",
    }),
    { status: 200, headers },
  );
