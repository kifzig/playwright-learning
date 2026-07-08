import { type Page, type Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly pageHeader: Locator;
  readonly widgetTitles: Locator;
  readonly userDropdownTab: Locator;
  readonly userDropdownName: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeader = page.locator('h6', { hasText: 'Dashboard' });
    this.widgetTitles = page.locator('.orangehrm-dashboard-widget-name');
    this.userDropdownTab = page.locator('.oxd-userdropdown-tab');
    this.userDropdownName = page.locator('.oxd-userdropdown-name');
    this.logoutLink = page.getByText('Logout');
  }

  async expectLoaded() {
    // webkit is occasionally slower to settle the SPA navigation after login than
    // the default 5s assertion timeout allows for on this demo instance.
    await this.page.waitForURL(/\/dashboard\/index/, { timeout: 15000 });
    await expect(this.pageHeader).toBeVisible();
  }

  async expectWidgetsVisible(expectedWidgets: string[]) {
    const titles = await this.widgetTitles.allInnerTexts();
    for (const widget of expectedWidgets) {
      expect(titles).toContain(widget);
    }
  }

  async logout() {
    await this.userDropdownTab.click();
    await this.logoutLink.click();
  }
}
