import type { Page, Locator } from "@playwright/test";
import { STORAGE_STATE_PATH } from '../playwright.config';

export class LoginPage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;

  constructor(public readonly page: Page) {
    this.emailInput = this.page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
    this.signInButton = this.page.getByRole('button', { name: 'Sign In', exact: true });
  }

  get context() {
    return this.page.context();
  }

  async goto() {
    await this.page.goto(
      "https://www.w3schools.com/"
    );
  }

  async login(username: string, password: string) {
    await this.page.getByRole('button', { name: 'Sign in to your account' }).click();
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();

    await this.context.storageState({ path: STORAGE_STATE_PATH });
  }
}
