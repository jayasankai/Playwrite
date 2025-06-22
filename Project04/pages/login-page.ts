import type { Page, Locator } from "@playwright/test";

export class LoginPage {
  private readonly userNameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(public readonly page: Page) {
    this.userNameInput = this.page.getByRole("textbox", { name: "Username" });
    this.passwordInput = this.page.getByRole("textbox", { name: "Password" });
    this.loginButton = this.page.getByRole("button", { name: "Login" });
  }

  get context() {
    return this.page.context();
  }

  async goto() {
    await this.page.goto("http://localhost:5173/");
  }
  
  async login(username: string, password: string) {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async isLoggedIn(): Promise<boolean> {
    // wait for the page to load after login in head less mode
    await this.page.waitForLoadState("networkidle");

    // Ensure no viewSignInButton and Toggle profile menu button is visible
    const isloginButtonVisible = await this.loginButton.isVisible();
    return !isloginButtonVisible;
  }

  async isLoggedOut(): Promise<boolean> {
    // Ensure the login button is visible
    const isLoginButtonVisible = await this.loginButton.isVisible();
    return isLoginButtonVisible;
  }
}
