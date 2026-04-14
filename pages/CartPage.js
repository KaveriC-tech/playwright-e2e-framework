class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems      = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.removeButton   = page.locator('.cart_item button');
    this.continueButton = page.locator('[data-test="continue-shopping"]');
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async getCartItemNames() {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async removeItem(itemName) {
    const item = this.page.locator(`.cart_item:has-text("${itemName}")`);
    await item.locator('button').click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueButton.click();
  }
}

module.exports = { CartPage };
