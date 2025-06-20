import { test as base } from "@playwright/test";
import { ProfilePage } from "../pages/profile-page";

export const test = base.extend<{
  profilePage: ProfilePage;
}>({
  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);
    await use(profilePage);
  },
});

export { expect } from "@playwright/test";