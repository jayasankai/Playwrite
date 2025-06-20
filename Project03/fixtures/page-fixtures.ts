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
  loginPage: async ({ page }, use, testInfo) => {
    const loginPage = new LoginPage(page);
    
    // Only perform login if running the setup project
    if (testInfo.project.name === 'setup') {
      await loginPage.goto();
      await loginPage.login(process.env.EMAIL || '', process.env.PASSWD || '');
    }
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