import { BasePage } from './base.page';
import { Locator, Page, expect } from '@playwright/test';

export class ProductsPage extends BasePage {
  readonly title: Locator;
  readonly sortSelect: Locator;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly burgerMenu: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.burgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async assertOnProductsPage() {
    await expect(this.title).toHaveText('Products');
  }

  async sortBy(optionValue: string) {
    await this.sortSelect.selectOption(optionValue); // e.g. 'lohi', 'az'
  }

  async getProductNames(): Promise<string[]> {
    return this.inventoryItems.locator('.inventory_item_name').allInnerTexts();
  }

  async getProductPrices(): Promise<number[]> {
    const prices = await this.inventoryItems.locator('.inventory_item_price').allInnerTexts();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }

  async addProductByName(name: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: name });
    const addButton = item.locator('button:has-text("Add to cart")');
    await this.click(addButton);
  }

  async openCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async getCartCount(): Promise<number> {
    if (!(await this.cartBadge.isVisible())) return 0;
    const text = await this.cartBadge.innerText();
    return Number(text);
  }

  async logout() {
    await this.click(this.burgerMenu);
    await this.click(this.logoutLink);
  }
}