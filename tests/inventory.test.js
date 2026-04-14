const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const users = require('../test-data/users.json');

test.describe('Inventory & Cart Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('inventory page loads with products', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const products = await inventoryPage.getProductNames();
    expect(products.length).toBeGreaterThan(0);
  });

  test('add single item to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    const count = await inventoryPage.getCartCount();
    expect(count).toBe('1');
  });

  test('add multiple items to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    const count = await inventoryPage.getCartCount();
    expect(count).toBe('2');
  });

  test('cart contains correct items', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    const cartItems = await cartPage.getCartItemNames();
    expect(cartItems).toContain('Sauce Labs Backpack');
  });

  test('remove item from cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.removeItem('Sauce Labs Backpack');
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(0);
  });

 test('sort products by price low to high', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('lohi');
    await page.waitForTimeout(1500);
    const priceElements = page.locator('.inventory_item_price');
    await priceElements.first().waitFor();
    const prices = await priceElements.allTextContents();
    const numeric = prices.map(p => parseFloat(p.replace('$', '')));
    for (let i = 0; i < numeric.length - 1; i++) {
      expect(numeric[i]).toBeLessThanOrEqual(numeric[i + 1]);
    }
  });


