import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login-page";

export const test = base.extend<{
  loginPage: LoginPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.USERNME || "", process.env.PASSWD || "");
    await use(loginPage);
  },
});

export { expect } from "@playwright/test";
