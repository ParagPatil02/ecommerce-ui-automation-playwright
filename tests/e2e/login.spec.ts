import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { ProductsPage } from '../src/pages/products.page';
import { validLogin, invalidLogins } from '../src/fixtures/loginData';
import { getEnvConfig } from '../src/utils/helpers';

const env = getEnvConfig();

test.describe('Login & Session @smoke', () => {
  test('Successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto('/');
    await loginPage.assertOnLoginPage();

    await loginPage.login(env.username, env.password);

    await productsPage.assertOnProductsPage();
    await expect(productsPage.inventoryItems.first()).toBeVisible();
  });

  for (const tc of invalidLogins) {
    test(`Negative login – ${tc.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto('/');
      await loginPage.login(tc.username, tc.password);

      await loginPage.assertErrorMessage(tc.expectedError);
      await loginPage.assertOnLoginPage();
    });
  }

  test('Logout clears session', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto('/');
    await loginPage.login(env.username, env.password);
    await productsPage.assertOnProductsPage();

    await productsPage.logout();
    await loginPage.assertOnLoginPage();
  });
});