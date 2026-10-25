import { describe, expect, it } from "vitest";
import fs from "node:fs";

describe("public PWA upgrade guarantees", () => {
  const config = fs.readFileSync("vite.config.ts", "utf8");
  const headers = fs.readFileSync("public/_headers", "utf8");
  const app = fs.readFileSync("src/App.tsx", "utf8");

  it("activates new service workers without hidden settings-only confirmation", () => {
    expect(config).toContain('registerType: "autoUpdate"');
    expect(config).toContain("skipWaiting: true");
    expect(config).toContain("clientsClaim: true");
    expect(app).toContain('window.addEventListener("focus", checkForUpdates)');
    expect(app).toContain("registration?.update()");
    expect(app).toContain("Päivitä Softwired nyt");
  });

  it("revalidates entry points while allowing hashed assets to be cached", () => {
    const lines = headers.split("\n");
    for (const path of [
      "/",
      "/index.html",
      "/sw.js",
      "/manifest.webmanifest",
    ]) {
      const position = lines.indexOf(path);
      expect(
        position,
        path + " must have a specific header rule",
      ).toBeGreaterThan(-1);
      expect(lines[position + 1]?.trim()).toMatch(/^Cache-Control: no-cache/);
    }
    expect(headers).toMatch(/\/sw\.js\n\s+Cache-Control: no-cache, no-store/);
    expect(headers).toMatch(/\/api\/\*\n\s+Cache-Control: no-store/);
  });
});
