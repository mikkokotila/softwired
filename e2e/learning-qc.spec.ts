import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { lessons } from "../src/content";

async function onboard(page: Page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Aloita oma oppimispolku" }).click();
}
async function openLesson(page: Page, id: string) {
  await page.goto("/#/lesson/" + id);
  await expect(page.locator("main h1")).toBeVisible();
}
async function beginRecall(page: Page) {
  await page.getByRole("button", { name: "Tutki, mistä on kyse" }).click();
  await page
    .getByRole("button", { name: "Sulje teksti ja palauta mieleen" })
    .click();
}
async function finishUncertainLesson(page: Page) {
  await page
    .getByRole("button", { name: "En osaa vielä – näytä esimerkki" })
    .click();
  await expect(page.getByText("Vertaa omaa vastaustasi.")).toBeVisible();
  await page.getByRole("button", { name: "Harjoittele ymmärrystä" }).click();
  for (const next of ["Seuraava tehtävä", "Sovella uuteen tilanteeseen"]) {
    await page
      .getByRole("button", { name: "En osaa vielä – katso perustelu" })
      .click();
    await expect(
      page.getByText("Et vielä tiennyt – opitaan yhdessä."),
    ).toBeVisible();
    await page.getByRole("button", { name: next }).click();
  }
  await page
    .getByRole("button", { name: "En osaa vielä – näytä mallivastaus" })
    .click();
  await expect(page.getByText("Vertaa omaa vastaustasi.")).toBeVisible();
  await page.getByRole("button", { name: "Valmis tältä erää" }).click();
  await expect(
    page.getByRole("heading", { name: "Hyvin tehty. Anna tiedon asettua." }),
  ).toBeVisible();
}
async function seedDueReview(page: Page, lessonId: string) {
  await page.evaluate((id) => {
    const state = JSON.parse(localStorage.getItem("kipina.study.v2")!);
    state.objectives[id] = {
      seenAt: Date.now() - 3 * 86_400_000,
      completedAt: Date.now() - 3 * 86_400_000,
      evidence: [],
      mistakes: 0,
      dueAt: Date.now() - 1000,
      intervalDays: 1,
      reviews: 0,
    };
    localStorage.setItem("kipina.study.v2", JSON.stringify(state));
  }, lessonId);
  // Hash navigation does not reload the app's React state. The test changed
  // localStorage externally, so reload before asserting the review's state.
  await page.reload();
  await page.goto("/#/practice?lesson=" + lessonId);
  await expect(page.getByLabel("Muistinvarainen vastauksesi")).toBeVisible();
  const observed = await page.evaluate(
    (id) => JSON.parse(localStorage.getItem("kipina.study.v2")!).objectives[id],
    lessonId,
  );
  expect(observed.seenAt).toBeLessThan(Date.now() - 2 * 86_400_000);
  await expect(page.getByText("VIIVÄSTETTY KERTAUS")).toBeVisible();
}

test("screenshot regression: En tiedä? allows progression and survives reload", async ({
  page,
}) => {
  await onboard(page);
  await openLesson(page, "1.1-3");
  await beginRecall(page);
  const response = page.getByLabel("Muistinvarainen vastauksesi");
  await response.fill("En tiedä?");
  await expect(
    page.getByRole("button", { name: "Tallenna oma yritys" }),
  ).toBeEnabled();
  await page.reload();
  await expect(response).toHaveValue("En tiedä?");
  await page.getByRole("button", { name: "Tallenna oma yritys" }).click();
  await expect(
    page.getByText("Et vielä tiennyt vastausta", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Harjoittele ymmärrystä" }).click();
  await page
    .getByRole("button", { name: "En osaa vielä – katso perustelu" })
    .click();
  await page.reload();
  await expect(
    page.getByText("Et vielä tiennyt – opitaan yhdessä."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Seuraava tehtävä" }).click();
  await page
    .getByRole("button", { name: "En osaa vielä – katso perustelu" })
    .click();
  await page
    .getByRole("button", { name: "Sovella uuteen tilanteeseen" })
    .click();
  await page.getByLabel("Oma kirjoitettu vastauksesi").fill("En tiedä?");
  await page.reload();
  await expect(page.getByLabel("Oma kirjoitettu vastauksesi")).toHaveValue(
    "En tiedä?",
  );
  await expect(
    page.getByRole("button", { name: "Lukitse oma vastaus" }),
  ).toBeEnabled();
  await page.getByRole("button", { name: "Lukitse oma vastaus" }).click();
  await expect(page.getByText("Vertaa omaa vastaustasi.")).toBeVisible();
  await page.getByRole("button", { name: "Valmis tältä erää" }).click();
  const state = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("kipina.study.v2")!),
  );
  const draft = state.drafts["1.1-3"];
  expect(draft.helpUsed).toBe(true);
  expect(draft.recallSubmitted).toBe(true);
  expect(draft.writtenSubmitted).toBe(true);
  expect(Object.values(draft.answers)).toEqual([-1, -1]);
  expect(
    state.objectives["1.1-3"].evidence.every(
      (e: { independent: boolean; correct: boolean }) =>
        !e.independent && !e.correct,
    ),
  ).toBe(true);
  expect(state.objectives["1.1-3"].transfer).toBeUndefined();
  expect(state.objectives["1.1-3"].completedAt).toBeTruthy();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Hyvin tehty. Anna tiedon asettua." }),
  ).toBeVisible();
});

test("blank fallback works in each stage without fabricated mastery", async ({
  page,
}) => {
  await onboard(page);
  await openLesson(page, "1.1-1");
  await beginRecall(page);
  await expect(
    page.getByRole("button", { name: "Tallenna oma yritys" }),
  ).toBeDisabled();
  await finishUncertainLesson(page);
  const state = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("kipina.study.v2")!),
  );
  expect(state.objectives["1.1-1"].evidence).toHaveLength(2);
  expect(
    state.objectives["1.1-1"].evidence.every(
      (e: { correct: boolean; independent: boolean }) =>
        !e.correct && !e.independent,
    ),
  ).toBe(true);
  expect(state.objectives["1.1-1"].transfer).toBeUndefined();
  await page
    .getByRole("button", { name: "Lue ja harjoittele uudelleen" })
    .click();
  await expect(
    page.getByRole("button", { name: "Sulje teksti ja palauta mieleen" }),
  ).toBeVisible();
});

test("very short genuine written answers can be submitted and reviewed", async ({
  page,
}) => {
  await onboard(page);
  await openLesson(page, "1.1-2");
  await beginRecall(page);
  await page.getByLabel("Muistinvarainen vastauksesi").fill("Viha");
  await expect(
    page.getByRole("button", { name: "Tallenna oma yritys" }),
  ).toBeEnabled();
  await page.getByRole("button", { name: "Tallenna oma yritys" }).click();
  await page.getByRole("button", { name: "Harjoittele ymmärrystä" }).click();
  for (const next of ["Seuraava tehtävä", "Sovella uuteen tilanteeseen"]) {
    await page
      .getByRole("button", { name: "En osaa vielä – katso perustelu" })
      .click();
    await page.getByRole("button", { name: next }).click();
  }
  await page.getByLabel("Oma kirjoitettu vastauksesi").fill("Tauko");
  await expect(
    page.getByRole("button", { name: "Lukitse oma vastaus" }),
  ).toBeEnabled();
  await page.getByRole("button", { name: "Lukitse oma vastaus" }).click();
  await page.getByRole("button", { name: "Vertaa itse malliin" }).click();
  await page.getByRole("button", { name: "Valmis tältä erää" }).click();
  await expect(
    page.getByRole("heading", { name: "Hyvin tehty. Anna tiedon asettua." }),
  ).toBeVisible();
});

test("unknown review response schedules another attempt instead of mastery", async ({
  page,
}) => {
  await onboard(page);
  await seedDueReview(page, "1.1-1");
  await page.getByLabel("Muistinvarainen vastauksesi").fill("En tiedä?");
  await expect(
    page.getByRole("button", { name: "Lukitse yritys ja jatka" }),
  ).toBeEnabled();
  await page.getByRole("button", { name: "Lukitse yritys ja jatka" }).click();
  for (const next of ["Toinen tarkistus", "Arvioi muistinvarainen vastaus"]) {
    await page
      .getByRole("button", { name: "En osaa vielä – katso perustelu" })
      .click();
    await page.getByRole("button", { name: next }).click();
  }
  await expect(
    page.getByRole("button", { name: "Tallenna oma arvio" }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Merkitse harjoitelluksi ja jatka" })
    .click();
  await expect(
    page.getByText("Oma arvio 0/4 tallennettu.", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Palaa kertausjonoon" }).click();
  const state = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("kipina.study.v2")!),
  );
  expect(state.objectives["1.1-1"].delayedRecall.score).toBe(0);
  expect(state.objectives["1.1-1"].reviews).toBe(0);
  expect(state.objectives["1.1-1"].dueAt).toBeGreaterThan(Date.now());
});

test("wrong review quiz answer cannot be self-marked as high mastery", async ({
  page,
}) => {
  await onboard(page);
  await seedDueReview(page, "1.1-1");
  await page
    .getByLabel("Muistinvarainen vastauksesi")
    .fill("Mielenterveys on arjen voimavara, suru on normaali tunne.");
  await page.getByRole("button", { name: "Lukitse yritys ja jatka" }).click();
  await page.getByRole("radio", { name: "En tunne koskaan surua." }).check();
  await page.getByRole("button", { name: "Tarkista vastaus" }).click();
  await page.getByRole("button", { name: "Toinen tarkistus" }).click();
  await page.getByRole("radio", { name: "Turvallinen ystävyyssuhde" }).check();
  await page.getByRole("button", { name: "Tarkista vastaus" }).click();
  await page
    .getByRole("button", { name: "Arvioi muistinvarainen vastaus" })
    .click();
  for (const box of await page
    .locator(".self-rubric input[type=checkbox]")
    .all())
    await box.check();
  await page.getByRole("button", { name: "Tallenna oma arvio" }).click();
  await expect(
    page.getByText("Oma arvio 2/4 tallennettu.", { exact: false }),
  ).toBeVisible();
  const state = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("kipina.study.v2")!),
  );
  expect(state.objectives["1.1-1"].delayedRecall.score).toBe(2);
});

test("all 52 lessons have an uninterrupted novice path", async ({
  page,
}, testInfo) => {
  test.setTimeout(240_000);
  await onboard(page);
  const sample =
    testInfo.project.name === "desktop"
      ? lessons
      : lessons.filter(
          (_, i) => i === 0 || i === lessons.length - 1 || i % 4 === 0,
        );
  for (const lesson of sample) {
    await openLesson(page, lesson.id);
    await beginRecall(page);
    await finishUncertainLesson(page);
  }
  const state = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("kipina.study.v2")!),
  );
  for (const lesson of sample) {
    expect(
      state.objectives[lesson.id]?.completedAt,
      "Completion " + lesson.id,
    ).toBeTruthy();
    expect(
      state.objectives[lesson.id]?.transfer,
      "No fabricated transfer " + lesson.id,
    ).toBeUndefined();
    expect(state.drafts[lesson.id]?.helpUsed, "Help needed " + lesson.id).toBe(
      true,
    );
  }
});

test("novice fallback pages meet core accessibility standards", async ({
  page,
}) => {
  await onboard(page);
  await openLesson(page, "6.2-1");
  await beginRecall(page);
  const actions = [
    () =>
      page
        .getByRole("button", { name: "En osaa vielä – näytä esimerkki" })
        .click(),
    () => page.getByRole("button", { name: "Harjoittele ymmärrystä" }).click(),
    () =>
      page
        .getByRole("button", { name: "En osaa vielä – katso perustelu" })
        .click(),
    () => page.getByRole("button", { name: "Seuraava tehtävä" }).click(),
    () =>
      page
        .getByRole("button", { name: "En osaa vielä – katso perustelu" })
        .click(),
    () =>
      page.getByRole("button", { name: "Sovella uuteen tilanteeseen" }).click(),
    () =>
      page
        .getByRole("button", { name: "En osaa vielä – näytä mallivastaus" })
        .click(),
  ];
  for (const action of actions) {
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      audit.violations.map(
        (v) => v.id + " " + v.nodes.map((n) => n.target.join(",")).join(";"),
      ),
    ).toEqual([]);
    await action();
  }
});

test("recoverable old saved quiz index cannot strand the student on a blank step", async ({
  page,
}) => {
  await onboard(page);
  await page.evaluate(() => {
    const s = JSON.parse(localStorage.getItem("kipina.study.v2")!);
    s.drafts["1.1-1"] = {
      stage: 3,
      recall: "En tiedä?",
      written: "",
      choiceIndex: 2,
      answers: {},
      recallSubmitted: true,
      writtenSubmitted: false,
      rubricViewed: false,
      helpUsed: true,
    };
    s.objectives["1.1-1"] = {
      seenAt: Date.now(),
      evidence: [],
      mistakes: 0,
      intervalDays: 0,
      reviews: 0,
    };
    localStorage.setItem("kipina.study.v2", JSON.stringify(s));
  });
  // A storage fixture must be loaded into React before hash navigation.
  await page.reload();
  await page.goto("/#/lesson/1.1-1");
  await expect(page.getByText("TEHTÄVÄ 2 / 2", { exact: false })).toBeVisible();
  await page
    .getByRole("button", { name: "En osaa vielä – katso perustelu" })
    .click();
  await page
    .getByRole("button", { name: "Sovella uuteen tilanteeseen" })
    .click();
  await page
    .getByRole("button", { name: "En osaa vielä – näytä mallivastaus" })
    .click();
  await page.getByRole("button", { name: "Valmis tältä erää" }).click();
  await expect(
    page.getByRole("heading", { name: "Hyvin tehty. Anna tiedon asettua." }),
  ).toBeVisible();
});
