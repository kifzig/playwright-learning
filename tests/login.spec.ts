import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

// Demo credentials are published on the login page itself by OrangeHRM
// (https://opensource-demo.orangehrmlive.com) — not a real secret.
const VALID_USERNAME = 'Admin';
const VALID_PASSWORD = 'admin123';

test.describe('Login', () => {
  test('logs in with valid credentials and reaches the dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);

    await dashboardPage.expectLoaded();
  });

  test('shows an error for invalid credentials and stays on the login page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('not_a_real_user', 'wrong_password');

    await loginPage.expectInvalidCredentialsError();
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('shows required-field validation when submitted empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginButton.click();

    // Both username and password are required
    await loginPage.expectRequiredFieldErrors(2);
  });
});
