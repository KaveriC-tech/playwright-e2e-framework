class InventoryPage {
  constructor(page) {
    this.page = page;
    this.productList    = page.locator('.inventory_item');
    this.cartIcon       = page.locator('.shopping_cart_link');
    this.cartBadge      = page.locator('.shopping_cart_badge');
    this.sortDropdown   = page.locator('[data-test="product_sort_container"]');
  }

  async addItemToCart(itemName) {
    const item = this.page.locator(`.inventory_item:has-text("${itemName}")`);
    await item.locator('button').click();
  }

  async getCartCount() {
    return await this.cartBadge.textContent();
  }

  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async getProductNames() {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }
}

module.exports = { InventoryPage };
