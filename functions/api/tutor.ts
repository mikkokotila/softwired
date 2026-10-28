/** Meta prohibits Muse integrated products targeted at users under 18. */
export const onRequestPost = async () =>
  new Response(
    JSON.stringify({
      error:
        "Muse Spark 1.3 Contributor ei ole käytettävissä alle 18-vuotiaiden opiskelijasovelluksessa Meta Model API:n käyttöehtojen vuoksi. Älä lähetä henkilötietoja. Jatka oppitunnin mallivastauksella.",
    }),
    {
      status: 403,
      headers: {
        "Cache-Control": "no-store, private",
        "Content-Type": "application/json; charset=utf-8",
      },
    },
  );
