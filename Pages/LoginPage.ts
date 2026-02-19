import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly loginButton: Locator;
  readonly passwordInput: Locator;
  readonly PasswordloginButton: Locator;
  readonly errorMessage: Locator;
  readonly Childfavfood: Locator;
  readonly childloginbtn: Locator;
  readonly quickLinksHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    // Selectors
    this.usernameInput = page.getByLabel("Email or Username");
    this.loginButton = page.locator("//input[@value='Log In']");
    this.passwordInput = page.getByLabel("Password");
    this.PasswordloginButton = page.locator("//input[@value='Log in']");
    this.Childfavfood = page.getByLabel(
      "What is the food you least liked as a child?",
    );

    // Note: If this is the same button as loginButton, you can reuse the same locator
    this.childloginbtn = page.locator("//input[@value='Log in']");

    //validating page title
    this.quickLinksHeader = page.locator(
      "h2[data-qe-id='My_Quick_Links_Title']",
    );
    this.errorMessage = page.locator(".error-message");
  }

  async navigate() {
    await this.page.goto("https://test.ypoconnect.org");
  }

  async login(user: string, pass: string) {
    await this.usernameInput.fill(user);
    await this.loginButton.click();
    await this.passwordInput.fill(pass);
    await this.PasswordloginButton.click();

    // Handling the secondary security question
    await this.Childfavfood.fill("Sweets");
    await this.childloginbtn.click();
    await expect(this.quickLinksHeader).toBeVisible({ timeout: 20000 });
  }
}
