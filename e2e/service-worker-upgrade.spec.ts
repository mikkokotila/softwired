import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";
import { freshState } from "../src/lib/storage";

const oldHTML =
  '<!doctype html><html lang="fi"><head><meta charset="utf-8"><title>Kipinä — vanha versio</title></head><body><main><h1>KIPINÄ</h1><p>Vanha sovellusversio on yhä aktiivinen.</p></main><script>navigator.serviceWorker.register("/sw.js").catch(console.error)</script></body></html>';

const oldWorker = [
  'const CACHE="kipina-legacy-pwa-test";',
  'self.addEventListener("install", e => {e.waitUntil(caches.open(CACHE).then(cache=>cache.add("/")).then(()=>self.skipWaiting()));});',
  'self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));',
  'self.addEventListener("fetch", e => {if(e.request.mode==="navigate"){e.respondWith(caches.match("/").then(hit=>hit||fetch(e.request)));}});',
].join("\n");

test("installed legacy Kipinä service worker upgrades to Softwired without deleting study progress", async ({
  browser,
}) => {
  test.setTimeout(90_000);
  let newRelease = false;
  const dist = path.resolve("dist");
  const server = createServer((req, res) => {
    const requested = new URL(req.url || "/", "http://localhost").pathname;
    if (!newRelease && requested === "/sw.js") {
      res.writeHead(200, {
        "Content-Type": "application/javascript",
        "Cache-Control": "no-store",
      });
      res.end(oldWorker);
      return;
    }
    if (!newRelease && (requested === "/" || requested === "/index.html")) {
      res.writeHead(200, {
        "Content-Type": "text/html",
        "Cache-Control": "no-store",
      });
      res.end(oldHTML);
      return;
    }
    if (requested.includes("..")) {
      res.writeHead(400);
      res.end();
      return;
    }
    const asset = path.join(
      dist,
      requested.replace(/^\/+/, "") || "index.html",
    );
    const file = existsSync(asset) ? asset : path.join(dist, "index.html");
    const extensions: Record<string, string> = {
      ".js": "application/javascript",
      ".css": "text/css",
      ".html": "text/html",
      ".svg": "image/svg+xml",
      ".png": "image/png",
      ".woff2": "font/woff2",
      ".webmanifest": "application/manifest+json",
    };
    res.writeHead(200, {
      "Content-Type":
        extensions[path.extname(file)] || "application/octet-stream",
      "Cache-Control":
        path.basename(file) === "sw.js" ? "no-store" : "no-cache",
    });
    res.end(readFileSync(file));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string")
    throw new Error("Missing test port");
  const origin = "http://127.0.0.1:" + address.port;
  const context = await browser.newContext({ serviceWorkers: "allow" });
  try {
    const page = await context.newPage();
    await page.goto(origin);
    await expect(page.getByRole("heading", { name: "KIPINÄ" })).toBeVisible();
    await page.evaluate(async () => {
      await navigator.serviceWorker.ready;
    });
    await expect
      .poll(() => page.evaluate(() => !!navigator.serviceWorker.controller))
      .toBe(true);
    await page.reload();
    await expect(page.getByRole("heading", { name: "KIPINÄ" })).toBeVisible();

    const original = freshState();
    original.onboarded = true;
    original.objectives["1.1-1"] = {
      evidence: [],
      mistakes: 0,
      intervalDays: 1,
      reviews: 0,
      seenAt: 1000,
      completedAt: 1200,
      dueAt: Date.now() + 86400000,
    };
    await page.evaluate((state) => {
      localStorage.setItem("kipina.study.v2", JSON.stringify(state));
      localStorage.setItem("softwired.appearance.v1", "nebula");
    }, original);

    newRelease = true;
    const changed = page.evaluate(
      () =>
        new Promise<boolean>((resolve) => {
          navigator.serviceWorker.addEventListener(
            "controllerchange",
            () => resolve(true),
            { once: true },
          );
          setTimeout(() => resolve(false), 20_000);
        }),
    );
    await page.evaluate(async () => {
      const registration = await navigator.serviceWorker.getRegistration();
      if (!registration) throw new Error("Legacy worker not registered");
      await registration.update();
    });
    expect(
      await changed,
      "New worker should claim existing legacy client",
    ).toBe(true);
    await page.reload();
    await expect(page).toHaveTitle("Softwired · Terveystieto 8");
    await expect(
      page.getByRole("heading", { name: "Ota koe haltuun." }),
    ).toBeVisible();
    const state = await page.evaluate(() => ({
      study: JSON.parse(localStorage.getItem("kipina.study.v2")!),
      theme: localStorage.getItem("softwired.appearance.v1"),
    }));
    expect(state.study.objectives["1.1-1"].completedAt).toBe(1200);
    expect(state.theme).toBe("nebula");
  } finally {
    await context.close();
    await new Promise<void>((resolve, reject) =>
      server.close((err) => (err ? reject(err) : resolve())),
    );
  }
});
