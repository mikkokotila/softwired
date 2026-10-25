/** Public pilot intentionally rejects all requests to the billable AI API. */
export const onRequestPost = async () =>
  new Response(
    JSON.stringify({
      error:
        "AI-opettaja ei ole käytössä tässä julkisessa kokeiluversiossa. Jatka oppituntia ja vertaa vastaustasi malliin.",
    }),
    {
      status: 503,
      headers: {
        "Cache-Control": "no-store, private",
        "Content-Type": "application/json; charset=utf-8",
      },
    },
  );
