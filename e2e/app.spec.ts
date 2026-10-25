import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
async function onboard(page: Page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Aloita oma oppimispolku" }).click();
}
async function mainRoute(page: Page, path: string) {
  await page.goto(`/#${path}`);
  await expect(page.locator("main h1")).toBeVisible();
}
test("dashboard, navigation and responsive layout have no horizontal overflow", async ({
  page,
}, testInfo) => {
  await onboard(page);
  await expect(
    page.getByRole("heading", { name: "Ota koe haltuun." }),
  ).toBeVisible();
  for (const path of [
    "/",
    "/course",
    "/practice",
    "/exam",
    "/progress",
    "/tutor",
    "/settings",
    "/session",
  ]) {
    await mainRoute(page, path);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await mainRoute(page, "/");
  await page.screenshot({
    path: `.local/dashboard-${testInfo.project.name}.png`,
    fullPage: true,
  });
});
test("complete lesson enforces attempts, saves stages, and does not fabricate mastery", async ({
  page,
}) => {
  await onboard(page);
  await mainRoute(page, "/session");
  await page.locator('main a[href="#/lesson/1.1-1?session=1"]').click();
  await page.getByRole("button", { name: "Tutki, mistä on kyse" }).click();
  await expect(
    page.getByText("Mielenterveys on voimavara:", { exact: false }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Sulje teksti ja palauta mieleen" })
    .click();
  await expect(page.getByText("Vertaa omaa vastaustasi.")).toHaveCount(0);
  await page
    .getByLabel("Muistinvarainen vastauksesi", { exact: true })
    .fill(
      "Mielenterveys on voimavara, joka auttaa arjessa ja tunteiden käsittelyssä.",
    );
  await page.reload();
  await expect(
    page.getByLabel("Muistinvarainen vastauksesi", { exact: true }),
  ).toHaveValue(/Mielenterveys on voimavara/);
  await page.getByRole("button", { name: "Tallenna oma yritys" }).click();
  await expect(page.getByText("Vertaa omaa vastaustasi.")).toBeVisible();
  await page.getByRole("button", { name: "Harjoittele ymmärrystä" }).click();
  await expect(
    page.getByRole("button", { name: "Tarkista vastaus" }),
  ).toBeDisabled();
  await page
    .getByRole("radio", {
      name: "Pystyn käsittelemään tunteita ja hakemaan tukea.",
      exact: true,
    })
    .check();
  await page.getByRole("button", { name: "Tarkista vastaus" }).click();
  await expect(page.getByText("Oikein. Huomaa myös perustelu.")).toBeVisible();
  await page.getByRole("button", { name: "Seuraava tehtävä" }).click();
  await page
    .getByRole("radio", { name: "Turvallinen ystävyyssuhde", exact: true })
    .check();
  await page.getByRole("button", { name: "Tarkista vastaus" }).click();
  await page
    .getByRole("button", { name: "Sovella uuteen tilanteeseen" })
    .click();
  await expect(page.getByText("Vertaa omaa vastaustasi.")).toHaveCount(0);
  await page
    .getByLabel("Oma kirjoitettu vastauksesi")
    .fill(
      "Mieliala vaihtelee päivän tapahtumien ja unen mukaan. Pitkittyvässä pahassa olossa kannattaa puhua turvalliselle aikuiselle.",
    );
  await page.getByRole("button", { name: "Lukitse oma vastaus" }).click();
  await page.getByRole("button", { name: "Vertaa itse malliin" }).click();
  await page.getByRole("button", { name: "Valmis tältä erää" }).click();
  await expect(
    page.getByRole("heading", { name: "Hyvin tehty. Anna tiedon asettua." }),
  ).toBeVisible();
  const data = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("kipina.study.v2")!),
  );
  expect(data.objectives["1.1-1"].completedAt).toBeTruthy();
  expect(data.objectives["1.1-1"].transfer).toBeUndefined();
  expect(data.objectives["1.1-1"].delayedRecall).toBeUndefined();
  expect(data.focusPlan.items).toHaveLength(4);
  expect(data.focusPlan.items[0].done).toBe(true);
});
test("missing API key is explicit and never sends a paid tutor request", async ({
  page,
}) => {
  let paid = 0;
  page.on("request", (r) => {
    if (r.url().endsWith("/api/tutor")) paid++;
  });
  await onboard(page);
  await mainRoute(page, "/tutor");
  await expect(
    page.getByText("AI odottaa avainta.", { exact: false }).first(),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Hyväksyn AI-pyyntöjen lähettämisen" })
    .click();
  await page
    .getByLabel("Minkä asian haluat ymmärtää?")
    .fill("Mitä on mielenterveys?");
  await expect(
    page.getByRole("button", { name: "Kysy opettajalta" }),
  ).toBeDisabled();
  expect(paid).toBe(0);
});
test("exam answers and deadline survive reload; written work is not fake-scored", async ({
  page,
}) => {
  await onboard(page);
  await mainRoute(page, "/exam");
  await page.getByRole("button", { name: "Aloita 15 minuutin koe" }).click();
  await page.locator("main input[type=radio]").first().check();
  await page.reload();
  await expect(page.locator("main input[type=radio]").first()).toBeChecked();
  await page.getByRole("button", { name: "Palauta koe nyt" }).click();
  await page.getByRole("button", { name: "Palauta ja näytä palaute" }).click();
  await expect(
    page.getByRole("heading", { name: "Tässä on seuraava suuntasi." }),
  ).toBeVisible();
  await expect(
    page.getByText("Vielä arvioimatta", { exact: true }).first(),
  ).toBeVisible();
  const s = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("kipina.study.v2")!),
  );
  expect(Object.keys(s.exams[0].aiScores)).toHaveLength(0);
  expect(Object.keys(s.exams[0].selfScores)).toHaveLength(0);
});
test("expired exam auto-submits after returning to the app", async ({
  page,
}) => {
  await onboard(page);
  await mainRoute(page, "/exam");
  await page.getByRole("button", { name: "Aloita 15 minuutin koe" }).click();
  await page.evaluate(() => {
    const s = JSON.parse(localStorage.getItem("kipina.study.v2")!);
    s.activeExam.startedAt = Date.now() - 16 * 60_000;
    localStorage.setItem("kipina.study.v2", JSON.stringify(s));
  });
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Tässä on seuraava suuntasi." }),
  ).toBeVisible();
});
test("production PWA has install assets and reads lessons after offline reload", async ({
  page,
  context,
}) => {
  test.setTimeout(60_000);
  await onboard(page);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await expect
    .poll(() => page.evaluate(() => !!navigator.serviceWorker.controller))
    .toBe(true);
  const manifest = await page.request.get("/manifest.webmanifest");
  expect(manifest.ok()).toBe(true);
  expect((await manifest.json()).lang).toBe("fi");
  await context.setOffline(true);
  await mainRoute(page, "/course");
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Ymmärrä kokonaisuus." }),
  ).toBeVisible();
  await expect(page.getByText("Offline-tila:", { exact: false })).toBeVisible();
  await mainRoute(page, "/lesson/8.3-4");
  await page.getByRole("button", { name: "Tutki, mistä on kyse" }).click();
  await expect(
    page.getByText(
      "Tajuttomalle ei anneta mitään suuhun, ei myöskään hunajaa;",
      { exact: false },
    ),
  ).toBeVisible();
  const cached = await page.evaluate(async () => {
    const names = await caches.keys();
    return (
      await Promise.all(
        names.map(async (n) =>
          (await (await caches.open(n)).keys()).map((r) => r.url),
        ),
      )
    ).flat();
  });
  expect(cached.some((url) => url.includes("/api/"))).toBe(false);
  await context.setOffline(false);
});
test("backup import validates before replacing local state", async ({
  page,
}) => {
  await onboard(page);
  await mainRoute(page, "/settings");
  const prior = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("kipina.study.v2")!),
  );
  await page
    .getByLabel("Valitse Softwiredin varmuuskopiotiedosto")
    .setInputFiles({
      name: "invalid.json",
      mimeType: "application/json",
      buffer: Buffer.from("{invalid"),
    });
  await expect(page.getByRole("alert")).toBeVisible();
  const imported = { ...prior, consent: true, examDate: "2026-12-01" };
  await page
    .getByLabel("Valitse Softwiredin varmuuskopiotiedosto")
    .setInputFiles({
      name: "backup.json",
      mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify(imported)),
    });
  await page.getByRole("button", { name: "Korvaa varmuuskopiolla" }).click();
  await expect(page.getByLabel("Oman kokeen päivämäärä")).toHaveValue(
    "2026-12-01",
  );
  await expect(
    page.getByRole("checkbox", {
      name: "Sallin omien AI-pyyntöjeni lähettämisen OpenAI API -palveluun.",
      exact: false,
    }),
  ).not.toBeChecked();
});
test("core pages pass accessibility rules", async ({ page }) => {
  await onboard(page);
  for (const path of ["/", "/course", "/lesson/1.1-1", "/exam", "/settings"]) {
    await mainRoute(page, path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        description: v.description,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          detail: n.failureSummary,
        })),
      })),
    ).toEqual([]);
  }
});
test("delayed independent review can record honestly labelled self-assessed mastery", async ({
  page,
}) => {
  await onboard(page);
  const now = Date.now();
  await page.evaluate((time) => {
    const s = JSON.parse(localStorage.getItem("kipina.study.v2")!);
    s.objectives["1.1-1"] = {
      seenAt: time - 2 * 86_400_000,
      completedAt: time - 2 * 86_400_000,
      evidence: [],
      mistakes: 0,
      intervalDays: 1,
      reviews: 0,
      dueAt: time - 1,
    };
    localStorage.setItem("kipina.study.v2", JSON.stringify(s));
  }, now);
  await page.reload();
  await mainRoute(page, "/practice?lesson=1.1-1");
  await expect(page.getByText("Vertaa omaa vastaustasi.")).toHaveCount(0);
  await page
    .getByLabel("Muistinvarainen vastauksesi", { exact: true })
    .fill(
      "Mielenterveys on voimavara arjessa. Suru ja muut tunteet voivat kuulua hyvään mielenterveyteen.",
    );
  await page.getByRole("button", { name: "Lukitse yritys ja jatka" }).click();
  await page
    .getByRole("radio", {
      name: "Pystyn käsittelemään tunteita ja hakemaan tukea.",
      exact: true,
    })
    .check();
  await page.getByRole("button", { name: "Tarkista vastaus" }).click();
  await page.getByRole("button", { name: "Toinen tarkistus" }).click();
  await page
    .getByRole("radio", { name: "Turvallinen ystävyyssuhde", exact: true })
    .check();
  await page.getByRole("button", { name: "Tarkista vastaus" }).click();
  await page
    .getByRole("button", { name: "Arvioi muistinvarainen vastaus" })
    .click();
  for (const box of await page
    .locator(".self-rubric input[type=checkbox]")
    .all())
    await box.check();
  await page.getByRole("button", { name: "Tallenna oma arvio" }).click();
  await page.getByRole("button", { name: "Palaa kertausjonoon" }).click();
  await mainRoute(page, "/course");
  await expect(
    page.getByText("Hallittu · oma arvio", { exact: false }),
  ).toBeVisible();
});
test("navigation supports keyboard focus and mobile menu trapping", async ({
  page,
}, testInfo) => {
  await onboard(page);
  if (testInfo.project.name !== "mobile") {
    const home = page
      .getByRole("navigation", { name: "Päävalikko", exact: true })
      .getByRole("link", { name: "Tänään", exact: true });
    await home.focus();
    await expect(home).toBeFocused();
    await expect(
      page.getByRole("button", { name: "Sulje valikko" }),
    ).toBeHidden();
    return;
  }
  await page.getByRole("button", { name: "Avaa valikko", exact: true }).click();
  const menu = page.getByRole("dialog", { name: "Sivuvalikko" });
  await expect(menu).toBeVisible();
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    expect(
      await menu.evaluate((el) => el.contains(document.activeElement)),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(menu).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Avaa valikko", exact: true }),
  ).toBeFocused();
});
