import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

const VALID_USERNAME = 'Admin';
const VALID_PASSWORD = 'admin123';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
  });

  test('shows the expected widgets after login', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.expectLoaded();

    await dashboardPage.expectWidgetsVisible([
      'Time at Work',
      'My Actions',
      'Quick Launch',
    ]);
  });

  test('logs out and returns to the login page', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.expectLoaded();

    await dashboardPage.logout();

    await expect(page).toHaveURL(/\/auth\/login/);
    const loginPage = new LoginPage(page);
    await expect(loginPage.loginButton).toBeVisible();
  });
});
