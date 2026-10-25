import { defineConfig } from "@playwright/test";
const testPort = Number(process.env.E2E_PORT ?? 4175);
const testOrigin = `http://127.0.0.1:${testPort}`;
export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  fullyParallel: true,
  workers: 2,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: testOrigin,
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    trace: "retain-on-failure",
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
