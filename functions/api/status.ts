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
      model: "gpt-6-astra",
      provider: "OpenAI API",
      contributorMode: false,
      verified: false,
      accessRequired: false,
      csrf: "",
      message: "AI odottaa avainta",
      paidNotice:
        "AI on julkisessa kokeiluversiossa pois käytöstä. Oppitunnit, kertaukset ja harjoituskokeet toimivat ilman AI:ta.",
    }),
    { status: 200, headers },
  );
