const { expect } = require('@playwright/test');

exports.CheckoutPage = class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = '#first-name';
    this.lastNameInput = '#last-name';
    this.postalCodeInput = '#postal-code';
    this.continueButton = '#continue';
    this.finishButton = '#finish';
    this.successHeader = '.complete-header';
  }

  async preencherDadosEntrega(firstName, lastName, postalCode) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
    await this.page.click(this.continueButton);
  }

  async finalizarCompra() {
    await this.page.click(this.finishButton);
  }

  async validarMensagemSucesso(mensagemEsperada) {
    await expect(this.page.locator(this.successHeader)).toHaveText(mensagemEsperada);
  }
};