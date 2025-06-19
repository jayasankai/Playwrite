import { test as base } from "@playwright/test";
import { ProfilePage } from "../pages/profile-page";
import { DashboardPage } from "../pages/dashboard-page";
import { LoginPage } from "../pages/login-page";

import { STORAGE_STATE_PATH } from "../playwright.config";

export const test = base.extend<{
  loginPage: LoginPage;
  profilePage: ProfilePage;
  dashboardPage: DashboardPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("student", "Password123");
    // Save the storage state after login
    await page.context().storageState({ path: STORAGE_STATE_PATH });

    await use(loginPage);
  },
  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);
    await use(profilePage);
  },
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
});

export { expect } from "@playwright/test";