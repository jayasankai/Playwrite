import type { Page } from "@playwright/test";

export class SettingsPage {
  constructor(public readonly page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://playwright.dev");
  }

  async switchToDarkMode() {
    await this.page
      .getByRole("button", { name: "Switch between dark and light" })
      .click();
    await this.page
      .getByRole("button", { name: "Switch between dark and light" })
      .click();
  }
}
