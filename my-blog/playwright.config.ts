import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  reporter: "html",
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run dev -- --port 3100",
    port: 3100,
    reuseExistingServer: !process.env.CI,
    env: {
      E2E_MOCK: "true",
      MICROCMS_SERVICE_DOMAIN: "dummy",
      MICROCMS_API_KEY: "dummy",
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
