const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const users = require('../test-data/users.json');

test.describe('Login Tests', () => {

  test('valid user can log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('locked out user sees error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.lockedUser.username, users.lockedUser.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('locked out');
  });

  test('invalid credentials show error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match');
  });

  test('username field is required', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', users.validUser.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username is required');
  });

  test('password field is required', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.validUser.username, '');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Password is required');
  });

});
