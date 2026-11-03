const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test('Fluxo E2E completo: Login, Adição de Produtos e Checkout no SauceDemo', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 1. Login com sucesso
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.validarPaginaProdutos();

  // 2. Adição de Produtos ao Carrinho e validação do contador
  await productsPage.adicionarDoisProdutos();
  await productsPage.validarContadorCarrinho('2');
  await productsPage.irParaCarrinho();

  // 3. Fluxo de Checkout Completo
  await cartPage.validarProdutosNoCarrinho();
  await cartPage.avancarParaCheckout();

  await checkoutPage.preencherDadosEntrega('Luis', 'Raupp', '90000-000');
  await checkoutPage.finalizarCompra();
  await checkoutPage.validarMensagemSucesso('Thank you for your order!');
});