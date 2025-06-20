import { test, expect } from "../fixtures/page-fixtures";
import { STORAGE_STATE_PATH } from '../playwright.config';

test.use({storageState: STORAGE_STATE_PATH});

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

  // test("welcome page has header message", async ({ dashboardPage }) => {
  //   expect(await dashboardPage.isHeaderMessageVisible()).toBe(true);
  // });

  // test("welcome page has welcome message", async ({ dashboardPage }) => {
  //   // welcome message should be visible after login
  //   expect(await dashboardPage.isWelcomeMessageVisible()).toBe(true);
  // });

  // test("user logout button whould work", async ({ dashboardPage }) => {
  //   await dashboardPage.clickLogout();
  //   // welcome message should not be visible after logout
  //   expect(await dashboardPage.isWelcomeMessageVisible()).toBe(false);
  // });
});
