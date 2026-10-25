import { defineConfig } from "@playwright/test";
const testPort = Number(process.env.E2E_PORT ?? 4175);
const testOrigin = `http://127.0.0.1:${testPort}`;
export default defineConfig({
  testDir: "./e2e",
  // Isolate this suite's output from concurrent test runners on the same Mac.
  outputDir: ".local/softwired-playwright-results",
  timeout: 30_000,
  fullyParallel: true,
  workers: 2,
  retries: 0,
  reporter: [
    ["list"],
    [
      "html",
      { open: "never", outputFolder: ".local/softwired-playwright-report" },
    ],
  ],
  use: {
    baseURL: testOrigin,
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    // Traces can conflict when multiple Playwright runs share a workspace.
    // Opt in explicitly when debugging: E2E_TRACE=1 npm run test:e2e
    trace: process.env.E2E_TRACE === "1" ? "retain-on-failure" : "off",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
    {
      name: "mobile",
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: "npm run serve",
    url: `${testOrigin}/api/status`,
    reuseExistingServer: false,
    timeout: 30_000,
    env: {
      OPENAI_API_KEY: "",
      APP_ORIGIN: testOrigin,
      HOST: "127.0.0.1",
      PORT: String(testPort),
    },
  },
});
