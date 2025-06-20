import type { Page, Locator } from "@playwright/test";

export class ProfilePage {
  private readonly myAccountLink: Locator;
  private readonly myAccountText: Locator;
  private readonly profileNickname: Locator;
  private readonly logoutLink: Locator;

  constructor(public readonly page: Page) {
    this.myAccountLink = this.page
      .locator("#account-section")
      .getByText("My Account", { exact: true });       
    this.myAccountText = this.page.getByText("My Profile").first();
    this.profileNickname = this.page.getByRole("textbox", {
      name: "Public Profile Nickname",
    });
    this.logoutLink = this.page.locator('#logout-link');
  }

  async goto() {
    await this.page.goto("https://profile.w3schools.com/profile");
  }

  async clickMyAccountLink() {
    await this.myAccountLink.click();
  }

  async isMyAccountTextVisible(): Promise<boolean> {
    return await this.myAccountText.isVisible();
  }

  async isProfileNicknameVisible(): Promise<boolean> {
    return await this.profileNickname.isVisible();
  }

  async logout() {
    await this.logoutLink.click();
  }
}
