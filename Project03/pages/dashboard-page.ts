import type { Page, Locator } from "@playwright/test";

export class DashboardPage {
  private readonly headerMessage: Locator;
  private readonly welcomeMessage: Locator;
  private readonly logoutButton: Locator;

  constructor(public readonly page: Page) {
    this.headerMessage = this.page.getByRole("heading", {
      name: "Logged In Successfully",
    });
    this.welcomeMessage = this.page.getByText(
      "Congratulations student. You successfully logged in!"
    );
    this.logoutButton = this.page.getByRole("button", { name: "Log out" });
  }

  async goto() {
    await this.page.goto("https://pathfinder.w3schools.com/");
  }

  async isWelcomeMessageVisible(): Promise<boolean> {
    return await this.welcomeMessage.isVisible();
  }

  async isHeaderMessageVisible(): Promise<boolean> {
    return await this.headerMessage.isVisible();
  }

  async clickLogout() {
    await this.logoutButton.click();
  }
}
