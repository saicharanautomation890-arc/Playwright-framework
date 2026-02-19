import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage'; // Notice the { }// Importing the data file
import * as validUser from '../Data/Logindata.json';

test.describe('Data-Driven Login Tests', () => {
  test.beforeEach(async ({ page, context }) => {
    // This clears cookies and storage for the specific context
    await context.clearCookies();
    await context.clearPermissions();
    
  });
  test('Success login- Validating title', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = validUser.validUser;

    await loginPage.navigate();
    await loginPage.login(validUser.validUser.username, validUser.validUser.password);

    await expect(page).toHaveURL(new RegExp(username.expectedUrl));
  });

});