import type { Page, Locator } from "@playwright/test";
import { STORAGE_STATE_PATH } from "../playwright.config";

export class LoginPage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly viewSignInButton: Locator;
  private readonly signInButton: Locator;
  private readonly profileMenuButton: Locator;

  constructor(public readonly page: Page) {
    this.viewSignInButton = this.page.getByRole("button", {
      name: "Sign in to your account",
    });
    this.emailInput = this.page.getByRole("textbox", { name: "Email" });
    this.passwordInput = this.page.getByRole("textbox", { name: "Password" });
    this.signInButton = this.page.getByRole("button", {
      name: "Sign In",
      exact: true,
    });
    this.profileMenuButton = this.page.getByRole("button", {
      name: "Toggle profile menu",
    });
  }

  get context() {
    return this.page.context();
  }

  async goto() {
    await this.page.goto("https://www.w3schools.com/");
  }

  async login(username: string, password: string) {
    await this.viewSignInButton.click();
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async isLoggedIn(): Promise<boolean> {
    // wait for the page to load after login for headless browsers
    await this.profileMenuButton.waitFor({
      state: "visible",
      timeout: 10000, // wait up to 10 seconds for the profile menu button
    });

    // Uncomment the line below if you want to wait for network idle state
    // await this.page.waitForLoadState("networkidle");

    // Ensure no viewSignInButton and Toggle profile menu button is visible
    const isViewSignInButtonVisible = await this.viewSignInButton.isVisible();
    const isToggleProfileMenuButtonVisible =
      await this.profileMenuButton.isVisible();
    return !isViewSignInButtonVisible && isToggleProfileMenuButtonVisible;
  }
}
