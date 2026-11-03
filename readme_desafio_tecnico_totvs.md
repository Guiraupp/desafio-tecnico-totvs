# Desafio Técnico de QA & Engenharia de Testes

Este repositório consolida as soluções e artefatos práticos desenvolvidos para o desafio técnico de Quality Assurance, abrangendo testes de API, modelagem de BDD, testes de performance e automação web end-to-end.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

* **Testes de API:** Bruno (Client API)
* **Engenharia de Requisitos & BDD:** Gherkin (`.md`)
* **Testes de Performance:** Apache JMeter (Modo Non-GUI, CSV Data Set, RegEx Extractor)
* **Automação Web (UI):** Playwright com JavaScript (Padrão Page Object Model - POM)
* **Versionamento:** Git & GitHub

---

## 📁 Estrutura do Repositório

```text
desafio-tecnico-totvs/
│
├── Desafio TOTVS - API Bruno/         # Coleção e requisições de testes de API (DummyJSON)
│   ├── Adicionar carrinho.json
│   ├── Cadastrar produto 1.json
│   ├── Cadastrar produto 2.json
│   ├── Consultar carrinho.json
│   ├── Consultar produto por ID.json
│   └── Remover carrinho.json
│
├── Teste Performance - JMeter/        # Scripts e massa de dados de performance (BlazeDemo)
│   ├── Desafio_BlazeDemo_Performance.jmx
│   └── dados_voos.csv
│
├── automacao-saucedemo/               # Projeto de Automação Web E2E (Playwright / POM)
│   ├── pages/                         # Page Objects (Login, Products, Cart, Checkout)
│   ├── tests/                         # Especificações de Teste E2E (SauceDemo)
│   └── playwright.config.js
│
├── Engenharia_de_Requisitos_E_Modelagem_de_Cenarios_de_Testes.md # Especificação BDD da US-042 (PayPal)
└── Questionário Desafio Técnico.txt   # Respostas e justificativas técnicas
```

---

## 🚀 Resumo das Entregas

### 1. Testes de API (DummyJSON)
Validação de endpoints REST utilizando o Bruno com asserções automatizadas em JavaScript (`test`/`expect`):
* **POST `/products/add`**: Cadastro de produtos simulados.
* **POST `/carts/add`**: Criação de carrinho associando os produtos criados.
* **GET `/carts/{id}`**: Consulta e validação da integridade dos itens do carrinho.
* **DELETE `/carts/{id}`**: Simulação de exclusão com validação da propriedade `isDeleted: true`.

### 2. Engenharia de Requisitos & BDD (US-042 - Integração PayPal)
Modelagem de 6 cenários de teste cobrindo a história de usuário para pagamentos via PayPal:
* **Caminho Feliz:** Automação e sucesso no redirecionamento e liberação imediata do curso.
* **Exceções e Cancelamento:** Tratamento de recusas de crédito e interrupções voluntárias pelo usuário.
* **Notificação Assíncrona:** Validação de Webhook/IPN para atualização de status de pedidos.
* **Concorrência e Interface:** Gestão de múltiplas sessões e validação visual no checkout.

### 3. Teste de Performance (Apache JMeter - BlazeDemo)
Script estruturado (`Desafio_BlazeDemo_Performance.jmx`) simulando cenários reais de carga:
* **Distribuição de Carga:** 80% do tráfego focado em Navegação/Busca de Voos e 20% em Reserva Completa.
* **Parametrização e Correlação:** Uso de `CSV Data Set Config` para massa de dados de cidades/voos e `Regular Expression Extractor` para capturar parâmetros dinâmicos de sessão.
* **Execução Non-GUI:** Otimizado para execução via linha de comando (`jmeter -n -t script.jmx -l resultado.jtl -e -o /relatorio_html`) gerando relatórios de métricas de Tempo de Resposta, Throughput e Percentis (P90/P95/P99).

### 4. Automação Web E2E (SauceDemo - Playwright & POM)
Suíte de testes desenvolvida em Playwright com JavaScript estruturada no padrão **Page Object Model (POM)**:
* **Fluxo Coberto:** Autenticação com `standard_user`, seleção e adição de 2 produtos ao carrinho, validação do badge do carrinho, preenchimento de dados de entrega e finalização do pedido (`Thank you for your order!`).
* **Boas Práticas:** Ausência total de esperas fixas (`sleep`), utilizando o mecanismo nativo de *auto-waiting* do Playwright e asserções limpas.

---

## 💻 Como Executar os Projetos Localmente

### Automação Web (Playwright)
```bash
cd automacao-saucedemo
npm install
npx playwright test --ui # Para modo interativo
```

### Testes de API (Bruno)
* Abra o aplicativo **Bruno**, selecione *Open Collection* e aponte para a pasta `Desafio TOTVS - API Bruno`.