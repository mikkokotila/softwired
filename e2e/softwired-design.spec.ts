import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function onboard(page: Page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Aloita oma oppimispolku" }).click();
}
async function go(page: Page, route: string) {
  await page.goto("/#" + route);
  await expect(page.locator("main h1")).toBeVisible();
}

test("Softwired branding and Command Center landing replace the old product name", async ({
  page,
}) => {
  await onboard(page);
  await expect(
    page.getByRole("heading", { name: "Ota koe haltuun." }),
  ).toBeVisible();
  await expect(page.getByText("MISSION SELECT")).toBeVisible();
  await expect(page.getByText("BOSS LEVEL")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Softwired, etusivu" }).first(),
  ).toBeVisible();
  expect(await page.locator(".command-world-card").count()).toBe(4);
  expect(await page.locator(".mission-card").count()).toBe(3);
  const manifest = await page.request.get("/manifest.webmanifest");
  expect(manifest.ok()).toBe(true);
  const info = await manifest.json();
  expect(info.name).toContain("SOFTWIRED");
  expect(info.lang).toBe("fi");
});

test("appearance switch persists while study-state remains independent", async ({
  page,
}) => {
  await onboard(page);
  await go(page, "/settings");
  const before = await page.evaluate(() =>
    localStorage.getItem("kipina.study.v2"),
  );
  const group = page.getByRole("group", { name: "Ulkoasun teema" });
  await expect(group.getByRole("radio", { name: /Orbit/i })).toBeChecked();
  await group.getByRole("radio", { name: /Nebula/i }).check();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "nebula");
  expect(
    await page.evaluate(() => localStorage.getItem("softwired.appearance.v1")),
  ).toBe("nebula");
  expect(
    await page.evaluate(() => localStorage.getItem("kipina.study.v2")),
  ).toBe(before);
  await page.reload();
  await expect(group.getByRole("radio", { name: /Nebula/i })).toBeChecked();
  await go(page, "/course");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "nebula");
  await go(page, "/settings");
  await group.getByRole("radio", { name: /Daybreak/i }).check();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "daybreak");
  const vars = await page.evaluate(() => ({
    app: getComputedStyle(document.documentElement)
      .getPropertyValue("--page-bg")
      .trim(),
    rail: getComputedStyle(document.documentElement)
      .getPropertyValue("--surface-rail")
      .trim(),
  }));
  expect(vars.app).toBe("#ecf1f5");
  expect(vars.rail).toBe("#15223a");
});

test("all themes keep readable core routes and no horizontal overflow", async ({
  page,
}, testInfo) => {
  test.setTimeout(95_000);
  await onboard(page);
  const widths =
    testInfo.project.name === "mobile" ? [320, 390] : [760, 1024, 1440];
  for (const theme of ["orbit", "nebula", "daybreak"]) {
    await go(page, "/settings");
    await page.getByRole("radio", { name: new RegExp(theme, "i") }).check();
    for (const width of widths) {
      await page.setViewportSize({ width, height: 850 });
      for (const route of [
        "/",
        "/course",
        "/lesson/1.1-3",
        "/practice",
        "/exam",
        "/progress",
        "/settings",
      ]) {
        await go(page, route);
        const dims = await page.evaluate(() => ({
          viewport: window.innerWidth,
          scroll: document.documentElement.scrollWidth,
        }));
        expect(
          dims.scroll,
          theme + " overflow at " + width + " on " + route,
        ).toBeLessThanOrEqual(dims.viewport);
      }
    }
  }
});

test("Orbit and Daybreak meet core accessibility checks across key screens", async ({
  page,
}) => {
  test.setTimeout(105_000);
  await onboard(page);
  for (const theme of ["orbit", "daybreak"]) {
    await go(page, "/settings");
    await page.getByRole("radio", { name: new RegExp(theme, "i") }).check();
    for (const route of [
      "/",
      "/course",
      "/lesson/1.1-3",
      "/exam",
      "/settings",
    ]) {
      await go(page, route);
      const audit = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        audit.violations.map((v) => ({
          id: v.id,
          targets: v.nodes.slice(0, 5).map((n) => n.target),
        })),
        theme + " violations on " + route,
      ).toEqual([]);
    }
  }
});

test("topic missions and exam arena navigate to real learning experiences", async ({
  page,
}) => {
  await onboard(page);
  await page.getByRole("link", { name: /AVAA TEHTÄVÄ/ }).click();
  await expect(
    page.getByRole("button", { name: "Tutki, mistä on kyse" }),
  ).toBeVisible();
  await go(page, "/");
  await page.getByRole("link", { name: /VALMISTAUDU/ }).click();
  await expect(
    page.getByRole("button", { name: "Aloita 15 minuutin koe" }),
  ).toBeVisible();
  await go(page, "/");
  await page.locator(".command-world-card").first().click();
  await expect(
    page.getByRole("heading", { name: "Ymmärrä kokonaisuus." }),
  ).toBeVisible();
});
