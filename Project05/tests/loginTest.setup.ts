import { test as setup, expect } from "../fixtures/login-fixture";
import { STORAGE_STATE_PATH } from "../playwright.config";

setup("Login setup", async ({ loginPage }) => {
  await loginPage.waitForLoad();
  expect(await loginPage.isLoggedIn()).toBe(true);

  try {
    // Save the storage state after login
    await loginPage.context.storageState({ path: STORAGE_STATE_PATH });
  } catch (err) {
    console.error("Failed to save storage state:", err);
  }
});
