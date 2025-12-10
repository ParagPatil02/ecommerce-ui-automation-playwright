import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  async waitForVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async click(locator: Locator) {
    await this.waitForVisible(locator);
    await locator.click();
  }

  async type(locator: Locator, text: string) {
    await this.waitForVisible(locator);
    await locator.fill(text);
  }
}
