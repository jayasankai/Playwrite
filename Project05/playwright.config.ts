import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });
export const STORAGE_STATE_PATH = path.join(
  __dirname,
  "playwright/.auth/userState.json"
);

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on-first-retry",
  },
  timeout: 20 * 1000, // Set a global timeout of 20 seconds for each test

  projects: [
    {
      name: "setup",
      testMatch: "**/*.setup.ts",
      timeout: 50 * 1000, // Set a timeout for setup tests
      use: {
        baseURL: process.env.NORMAL_URL,
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "Normal user e2e tests",
      testMatch: "**/*.spec.ts",
      dependencies: ["setup"],
      timeout: 20 * 1000, // Set a timeout for remote e2e tests
      use: {
        baseURL: process.env.NORMAL_URL,
        storageState: STORAGE_STATE_PATH,
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "Special user e2e tests",
      testMatch: "**/*.spec.ts",
      timeout: 20 * 1000, // Set a timeout for local e2e tests
      use: {
        baseURL: process.env.SPECIAL_URL,
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
