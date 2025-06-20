import { test, expect } from "../fixtures/page-fixtures";
import { STORAGE_STATE_PATH } from "../playwright.config";

test.use({ storageState: STORAGE_STATE_PATH });

test.describe("W3Schools login and search", () => {
  test("profile page has My Account text", async ({ profilePage }) => {
    await profilePage.goto();
    await profilePage.clickMyAccountLink();
    expect(await profilePage.isMyAccountTextVisible()).toBe(true);
  });

  test("profile page has Profile Nickname text", async ({ profilePage }) => {
    await profilePage.goto();
    await profilePage.clickMyAccountLink();
    expect(await profilePage.isProfileNicknameVisible()).toBe(true);
  });

  test("user logout button whould work", async ({ profilePage }) => {
    await profilePage.goto();
    await profilePage.logout();
    expect(await profilePage.isMyAccountTextVisible()).toBe(false);
  });
});
