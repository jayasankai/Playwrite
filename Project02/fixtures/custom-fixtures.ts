import { test as base } from "@playwright/test";
import { TodoPage } from "../pages/todo-page";
import { SettingsPage } from "../pages/settings-page";
import { PlaywrightDevPage } from "../pages/playwright-dev-page";

// Declare the types of your fixtures.
type CustomFixtures = {
  todoPage: TodoPage;
  settingsPage: SettingsPage;
  playwrightDevPage: PlaywrightDevPage;
};

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<CustomFixtures>({
  todoPage: async ({ page }, use) => {
    // Set up the fixture.
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addToDo("item1");
    await todoPage.addToDo("item2");

    // Use the fixture value in the test.
    await use(todoPage);

    // Clean up the fixture.
    await todoPage.removeAll();
  },

  settingsPage: async ({ page }, use) => {
    const settingsPage = new SettingsPage(page);
    await settingsPage.goto();
    await use(settingsPage);
  },

  playwrightDevPage: async ({ page }, use) => {
    const playwrightDevPage = new PlaywrightDevPage(page);
    await playwrightDevPage.goto();
    await use(playwrightDevPage);
  },
});

export { expect } from "@playwright/test";
