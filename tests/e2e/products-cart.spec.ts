import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { ProductsPage } from '../src/pages/products.page';
import { CartPage } from '../src/pages/cart.page';
import { getEnvConfig } from '../src/utils/helpers';

const env = getEnvConfig();

test.describe('Products & Cart @regression', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto('/');
    await loginPage.login(env.username, env.password);
    await productsPage.assertOnProductsPage();
  });

  test('Product sorting by price low-to-high', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.sortBy('lohi');
    const prices = await productsPage.getProductPrices();

    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('Add & remove items from cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    const itemsToAdd = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt'
    ];

    for (const name of itemsToAdd) {
      await productsPage.addProductByName(name);
    }

    const cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe(itemsToAdd.length);

    await productsPage.openCart();

    const cartItemNames = await cartPage.getCartItemNames();
    expect(cartItemNames.sort()).toEqual(itemsToAdd.sort());

    const cartItemPrices = await cartPage.getCartItemPrices();
    expect(cartItemPrices.length).toBe(itemsToAdd.length);

    const itemToRemove = itemsToAdd[0];
    await cartPage.removeItemByName(itemToRemove);

    await cartPage.assertCartCount(itemsToAdd.length - 1);
    const updatedNames = await cartPage.getCartItemNames();
    expect(updatedNames).not.toContain(itemToRemove);
  });
});