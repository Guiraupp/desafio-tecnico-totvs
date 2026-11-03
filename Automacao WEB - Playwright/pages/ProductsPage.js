const { expect } = require('@playwright/test');

exports.ProductsPage = class ProductsPage {
  constructor(page) {
    this.page = page;
    this.titleSpan = '.title';
    this.cartBadge = '.shopping_cart_badge';
    this.cartIcon = '.shopping_cart_link';
    this.firstProductAddBtn = '#add-to-cart-sauce-labs-backpack';
    this.secondProductAddBtn = '#add-to-cart-sauce-labs-bike-light';
  }

  async validarPaginaProdutos() {
    await expect(this.page.locator(this.titleSpan)).toHaveText('Products');
  }

  async adicionarDoisProdutos() {
    await this.page.click(this.firstProductAddBtn);
    await this.page.click(this.secondProductAddBtn);
  }

  async validarContadorCarrinho(quantidadeEsperada) {
    await expect(this.page.locator(this.cartBadge)).toHaveText(quantidadeEsperada);
  }

  async irParaCarrinho() {
    await this.page.click(this.cartIcon);
  }
};