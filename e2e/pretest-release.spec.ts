import { expect, test, type Page } from "@playwright/test";

async function onboard(page: Page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Aloita oma oppimispolku" }).click();
}

test("existing Muse-era learner retains completed work and has provider consent reset", async ({
  page,
}) => {
  await onboard(page);
  await page.evaluate(() => {
    const state = JSON.parse(localStorage.getItem("kipina.study.v2")!);
    state.consent = true;
    state.consentProvider = "meta-muse-spark-contributor-v1";
    state.objectives["1.1-3"] = {
      seenAt: Date.now() - 86_400_000,
      completedAt: Date.now() - 86_400_000,
      evidence: [],
      mistakes: 0,
      dueAt: Date.now() + 86_400_000,
      intervalDays: 1,
      reviews: 0,
    };
    state.drafts["1.1-3"] = {
      stage: 5,
      recall: "Vanhasta oppitunnista tallennettu sisältö",
      written: "Minäkuva kuvaa omaa käsitystä itsestäni",
      choiceIndex: 1,
      answers: {},
      recallSubmitted: true,
      writtenSubmitted: true,
      rubricViewed: true,
      helpUsed: false,
    };
    localStorage.setItem("kipina.study.v2", JSON.stringify(state));
  });
  await page.reload();
  await page.goto("/#/lesson/1.1-3");
  await expect(
    page.getByRole("heading", { name: "Hyvin tehty. Anna tiedon asettua." }),
  ).toBeVisible();
  const state = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("kipina.study.v2")!),
  );
  expect(state.objectives["1.1-3"].completedAt).toBeTruthy();
  expect(state.drafts["1.1-3"].recall).toContain("Vanhasta");
  expect(state.consent).toBe(false);
  expect(state.consentProvider).toBeUndefined();
  await page.goto("/#/settings");
  await expect(
    page.getByRole("checkbox", {
      name: /Muse Spark 1.3 Contributor/,
    }),
  ).not.toBeChecked();
});

test("small phone, tablet and desktop widths have usable lesson and settings layouts", async ({
  page,
}) => {
  await onboard(page);
  for (const width of [320, 360, 390, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 760 });
    for (const route of [
      "/",
      "/course",
      "/lesson/1.1-3",
      "/settings",
      "/exam",
    ]) {
      await page.goto("/#" + route);
      await expect(page.locator("main h1")).toBeVisible();
      const size = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
      }));
      expect(
        size.width,
        "Unexpected horizontal overflow at " + width + "px in " + route,
      ).toBeLessThanOrEqual(size.viewport);
    }
  }
});

test("AI moderation refusal is safely shown without scoring or trapping the student", async ({
  page,
}) => {
  await page.route("**/api/status", async (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        configured: true,
        model: "muse-spark-1.3-contributor",
        provider: "Meta Model API",
        contributorMode: true,
        verified: false,
        accessRequired: false,
        csrf: "test-local-csrf",
        message: "Avain määritetty",
        paidNotice: "API voi olla maksullinen.",
      }),
    }),
  );
  let calls = 0;
  await page.route("**/api/tutor", async (route) => {
    calls += 1;
    await route.fulfill({
      status: 422,
      contentType: "application/json",
      body: JSON.stringify({
        error:
          "Tämä voi olla vakava tai henkilökohtainen asia. Kerro heti turvalliselle aikuiselle. Jos olet välittömässä vaarassa, soita 112.",
      }),
    });
  });
  await onboard(page);
  await page.goto("/#/tutor");
  await page
    .getByRole("button", { name: "Hyväksyn AI-pyyntöjen lähettämisen" })
    .click();
  await page
    .getByLabel("Minkä asian haluat ymmärtää?")
    .fill("Kerro minulle mielenterveyden perusteista?");
  await page.getByRole("button", { name: "Kysy opettajalta" }).click();
  await expect(
    page.getByText("Kerro heti turvalliselle aikuiselle", { exact: false }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Kysy opettajalta" }),
  ).toBeEnabled();
  expect(calls).toBe(1);
  await page.goto("/#/course");
  await expect(
    page.getByRole("heading", { name: "Ymmärrä kokonaisuus." }),
  ).toBeVisible();
});

test("AI unreachable and no configured key are explained without breaking offline course", async ({
  page,
}) => {
  await page.route("**/api/status", async (route) => {
    await route.abort("failed");
  });
  await onboard(page);
  await page.goto("/#/tutor");
  await expect(
    page.getByText("AI-palvelin ei vastaa", { exact: false }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Kysy opettajalta" }),
  ).toBeDisabled();
  await page.goto("/#/lesson/6.2-1");
  await page.getByRole("button", { name: "Tutki, mistä on kyse" }).click();
  await expect(page.getByText("YMMÄRRÄ ENNEN MUISTAMISTA")).toBeVisible();
});
