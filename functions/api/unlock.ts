/** There is no AI access token in the public static pilot. */
export const onRequestPost = async () =>
  new Response(
    JSON.stringify({
      error: "AI-yhteyden avaaminen ei ole käytössä tässä kokeiluversiossa.",
    }),
    {
      status: 503,
      headers: {
        "Cache-Control": "no-store, private",
        "Content-Type": "application/json; charset=utf-8",
      },
    },
  );
