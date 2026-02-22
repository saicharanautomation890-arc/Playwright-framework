import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage"; // Notice the { }// Importing the data file
import * as validUser from "../Data/Logindata.json";

test.describe("Browser Cookies Clear Step", () => {
  test.beforeEach(async ({ page, context }) => {
    // This clears cookies and storage for the specific context
    await context.clearCookies();
    await context.clearPermissions();
  });
  test("Verifying Fourm Functionality", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = validUser.validUser;

    await loginPage.navigate();
    await loginPage.login(
      validUser.validUser.username,
      validUser.validUser.password,
    );
    await page.waitForLoadState("load");

    //Click on Forum Buttons
    await page.locator("//div[contains(text(),'forums')]").click();

    const pagePromise = page.context().waitForEvent("page");
    await page.locator("a[data-qe-id='forum_Forum Hub'] span").click();

    // Wait for the URL to contain 'dashboard' with a 1-minute timeout
    await page.waitForLoadState("load");
    const newTab = await pagePromise;

    const searchBox = newTab.getByPlaceholder("Start Searching");
    await page.waitForLoadState("load");

    await searchBox.fill("Acquire Forum");
    await searchBox.press("Enter");
    await page.waitForLoadState("load");
await newTab.getByText('Acquire Forum').first().click();
    await page.waitForLoadState("load");
 
  });
});
