import { BasePage } from './base.page';
import { Locator, Page, expect } from '@playwright/test';

export class CheckoutPage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly errorMessage: Locator;
  readonly summaryItems: Locator;
  readonly summaryTotal: Locator;
  readonly confirmationHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.summaryItems = page.locator('.cart_item');
    this.summaryTotal = page.locator('.summary_total_label');
    this.confirmationHeader = page.locator('.complete-header');
  }

  async fillCustomerDetails(first: string, last: string, zip: string) {
    await this.type(this.firstName, first);
    await this.type(this.lastName, last);
    await this.type(this.postalCode, zip);
  }

  async continue() {
    await this.click(this.continueButton);
  }

  async finish() {
    await this.click(this.finishButton);
  }

  async assertErrorMessage(expectedText: string) {
    await expect(this.errorMessage).toContainText(expectedText);
  }

  async getSummaryItemNames(): Promise<string[]> {
    return this.summaryItems.locator('.inventory_item_name').allInnerTexts();
  }

  async getSummaryTotal(): Promise<number> {
    const text = await this.summaryTotal.innerText(); // e.g. "Total: $58.29"
    const match = text.match(/Total:\s*\$(\d+(\.\d+)?)/);
    return match ? parseFloat(match[1]) : NaN;
  }

  async assertOrderCompleted() {
    await expect(this.confirmationHeader).toHaveText('Thank you for your order!');
  }
}