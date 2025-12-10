import { BasePage } from './base.page';
import { Locator, Page, expect } from '@playwright/test';

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async getCartItemNames(): Promise<string[]> {
    return this.cartItems.locator('.inventory_item_name').allInnerTexts();
  }

  async getCartItemPrices(): Promise<number[]> {
    const prices = await this.cartItems.locator('.inventory_item_price').allInnerTexts();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }

  async removeItemByName(name: string) {
    const item = this.cartItems.filter({ hasText: name });
    const removeButton = item.locator('button:has-text("Remove")');
    await this.click(removeButton);
  }

  async goToCheckout() {
    await this.click(this.checkoutButton);
  }

  async assertCartCount(expected: number) {
    await expect(this.cartItems).toHaveCount(expected);
  }
}