import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { ProductsPage } from '../src/pages/products.page';
import { CartPage } from '../src/pages/cart.page';
import { CheckoutPage } from '../src/pages/checkout.page';
import { getEnvConfig } from '../src/utils/helpers';

const env = getEnvConfig();

test.describe('Checkout Flow @regression', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto('/');
    await loginPage.login(env.username, env.password);
    await productsPage.assertOnProductsPage();
  });

  test('Successful checkout', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const itemsToBuy = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
    for (const name of itemsToBuy) {
      await productsPage.addProductByName(name);
    }

    await productsPage.openCart();

    const cartNames = await cartPage.getCartItemNames();
    expect(cartNames.sort()).toEqual(itemsToBuy.sort());

    const cartPrices = await cartPage.getCartItemPrices();
    const expectedTotalProducts = cartPrices.reduce((a, b) => a + b, 0);

    await cartPage.goToCheckout();

    await checkoutPage.fillCustomerDetails('John', 'Doe', '12345');
    await checkoutPage.continue();

    const summaryNames = await checkoutPage.getSummaryItemNames();
    expect(summaryNames.sort()).toEqual(itemsToBuy.sort());

    const summaryTotal = await checkoutPage.getSummaryTotal();
    expect(summaryTotal).toBeGreaterThanOrEqual(expectedTotalProducts);

    await checkoutPage.finish();
    await checkoutPage.assertOrderCompleted();
  });

  test('Form validation – missing mandatory fields', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await productsPage.addProductByName('Sauce Labs Backpack');
    await productsPage.openCart();
    await cartPage.goToCheckout();

    await checkoutPage.continue();
    await checkoutPage.assertErrorMessage('First Name is required');

    await checkoutPage.fillCustomerDetails('John', '', '');
    await checkoutPage.continue();
    await checkoutPage.assertErrorMessage('Last Name is required');

    await checkoutPage.fillCustomerDetails('John', 'Doe', '');
    await checkoutPage.continue();
    await checkoutPage.assertErrorMessage('Postal Code is required');
  });
});