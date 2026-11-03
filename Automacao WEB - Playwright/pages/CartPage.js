const { expect } = require('@playwright/test');

exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = '#checkout';
    this.cartItem = '.cart_item';
  }

  async validarProdutosNoCarrinho() {
    await expect(this.page.locator(this.cartItem)).toHaveCount(2);
  }

  async avancarParaCheckout() {
    await this.page.click(this.checkoutButton);
  }
};