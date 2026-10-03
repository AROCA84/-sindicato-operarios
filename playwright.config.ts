import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  globalTimeout: 5 * 60 * 1000,
  expect: { timeout: 5_000 },
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: process.env.BASE_URL || "https://sindicato-operarios.vercel.app",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["iPhone 15 Pro"] } },
  ],
});
