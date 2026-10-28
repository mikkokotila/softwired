import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { makeExam } from "../src/content/exams";
import { lessons } from "../src/content";

async function onboard(page: Page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Aloita oma oppimispolku" }).click();
}
async function lessonRecall(page: Page, id = "1.1-1") {
  await page.goto("/#/lesson/" + id);
  await page.getByRole("button", { name: "Tutki, mistä on kyse" }).click();
  await page
    .getByRole("button", { name: "Sulje teksti ja palauta mieleen" })
    .click();
}
async function toApplication(page: Page) {
  await page.getByRole("button", { name: "Harjoittele ymmärrystä" }).click();
  for (const next of ["Seuraava tehtävä", "Sovella uuteen tilanteeseen"]) {
    await page
      .getByRole("button", { name: "En osaa vielä – katso perustelu" })
      .click();
    await page.getByRole("button", { name: next }).click();
  }
}

test("recall produces immediate answer-aware feedback and an interactive self-review", async ({
  page,
}) => {
  await onboard(page);
  await lessonRecall(page);
  const prompt = lessons[0].recall;
  await page
    .getByLabel("Muistinvarainen vastauksesi")
    .fill(
      "Mielenterveys on voimavara arjessa ja auttaa ihmistä kohtaamaan vaikeudet. Se ei tarkoita jatkuvaa onnellisuutta.",
    );
  await expect(page.locator(".written-feedback")).toHaveCount(0);
  await page.getByRole("button", { name: "Tallenna oma yritys" }).click();
  const feedback = page.locator(".written-feedback");
  await expect(feedback).toBeVisible();
  await expect(
    feedback.getByRole("heading", { name: "Palaute vastauksestasi" }),
  ).toBeVisible();
  await expect(feedback).toContainText(
    "Samoja tai samankaltaisia sanoja mallivastauksessa",
  );
  await expect(feedback).toContainText(prompt.rubric[1]);
  await expect(feedback).toContainText("ei opettajan tai AI:n");
  const selfReview = page.locator(".self-rubric");
  await expect(selfReview.getByText(prompt.model)).toBeVisible();
  await expect(
    selfReview.getByText("Merkitse ne arviointikohdat"),
  ).toBeVisible();
  await selfReview.getByRole("checkbox").first().check();
  await expect(
    selfReview.getByText("Oman tarkistuksesi perusteella mukana:"),
  ).toBeVisible();
  await expect(selfReview.getByText("Vahvista seuraavaksi:")).toBeVisible();
  await page.reload();
  await expect(page.locator(".written-feedback")).toBeVisible();
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("kipina.study.v2")!).drafts["1.1-1"]
          .recallSubmitted,
    ),
  ).toBe(true);
});

test("written application gives useful feedback before revealing the model, then supports checking", async ({
  page,
}) => {
  await onboard(page);
  await lessonRecall(page);
  await page
    .getByRole("button", { name: "En osaa vielä – näytä esimerkki" })
    .click();
  await toApplication(page);
  await page
    .getByLabel("Oma kirjoitettu vastauksesi")
    .fill(
      "Mieliala vaihtelee yhden päivän tapahtumien mukaan, siksi yksi huono päivä ei tarkoita sairautta. Pitkittyvässä pahassa olossa kannattaa puhua turvalliselle aikuiselle.",
    );
  await page.getByRole("button", { name: "Lukitse oma vastaus" }).click();
  await expect(page.locator(".written-feedback")).toBeVisible();
  await expect(page.getByText(lessons[0].application.model)).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Vertaa itse malliin" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Vertaa itse malliin" }).click();
  await expect(page.getByText(lessons[0].application.model)).toBeVisible();
  const rubric = page.locator(".self-rubric");
  await rubric.getByRole("checkbox").first().check();
  await expect(rubric.getByText("Vahvista seuraavaksi:")).toBeVisible();
  await page.getByRole("button", { name: "Valmis tältä erää" }).click();
  const state = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("kipina.study.v2")!),
  );
  expect(state.objectives["1.1-1"].transfer).toBeUndefined();
});

test("revision feedback responds after the locked answer without pretending to grade it", async ({
  page,
}) => {
  await onboard(page);
  await page.goto("/#/practice?lesson=1.1-1");
  await page.getByLabel("Muistinvarainen vastauksesi").fill("En tiedä?");
  await page.getByRole("button", { name: "Lukitse yritys ja jatka" }).click();
  for (const next of ["Toinen tarkistus", "Arvioi muistinvarainen vastaus"]) {
    await page
      .getByRole("button", { name: "En osaa vielä – katso perustelu" })
      .click();
    await page.getByRole("button", { name: next }).click();
  }
  const feedback = page.locator(".written-feedback");
  await expect(feedback).toBeVisible();
  await expect(feedback).toContainText("Kirjoitit, ettet vielä tiedä");
  await expect(feedback).toContainText(lessons[0].recall.rubric[0]);
  await expect(
    page.getByRole("button", { name: "Merkitse harjoitelluksi ja jatka" }),
  ).toBeVisible();
});

test("every written mock-exam answer gets feedback immediately on the results screen", async ({
  page,
}) => {
  await onboard(page);
  const seed = 2026;
  const written = makeExam(15, seed).filter((q) => q.kind === "written");
  expect(written).toHaveLength(4);
  await page.evaluate(
    ({ seed, id, answer }) => {
      const state = JSON.parse(localStorage.getItem("kipina.study.v2")!);
      state.exams = [
        {
          id: "feedback-pilot-exam",
          minutes: 15,
          seed,
          startedAt: Date.now() - 1_000_000,
          finishedAt: Date.now() - 200_000,
          answers: { [id]: answer },
          selfScores: {},
          aiScores: {},
        },
      ];
      localStorage.setItem("kipina.study.v2", JSON.stringify(state));
    },
    {
      seed,
      id: written[0].id,
      answer:
        "Koulussa turvallinen ryhmä auttaa, mutta kiusaaminen heikentää hyvinvointia ja toimintakykyä.",
    },
  );
  await page.reload();
  await page.goto("/#/exam");
  await page.getByRole("button", { name: /Näytä palaute/ }).click();
  await expect(page.locator(".result-question .written-feedback")).toHaveCount(
    4,
  );
  const answered = page.locator(".result-question").filter({
    has: page.getByRole("heading", { name: written[0].item.written.prompt }),
  });
  await expect(answered.locator(".written-feedback")).toBeVisible();
  await expect(answered.locator(".written-feedback")).toContainText(
    written[0].item.written.rubric[0],
  );
  await expect(
    answered.getByRole("button", { name: "Avaa oman arvion rubriikki" }),
  ).toBeVisible();
  await answered
    .getByRole("button", { name: "Avaa oman arvion rubriikki" })
    .click();
  await expect(answered.locator(".self-rubric")).toBeVisible();
  await answered.locator(".self-rubric input[type=checkbox]").first().check();
  await expect(answered.locator(".self-review-result")).toContainText(
    "Oman tarkistuksesi perusteella mukana",
  );
});

test("written feedback meets core accessibility and narrow mobile layout", async ({
  page,
}) => {
  await onboard(page);
  await page.setViewportSize({ width: 320, height: 760 });
  await lessonRecall(page, "6.2-1");
  await page.getByLabel("Muistinvarainen vastauksesi").fill("En tiedä?");
  await page.getByRole("button", { name: "Tallenna oma yritys" }).click();
  await expect(page.locator(".written-feedback")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  const violations = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(violations.violations.map((v) => v.id)).toEqual([]);
});
