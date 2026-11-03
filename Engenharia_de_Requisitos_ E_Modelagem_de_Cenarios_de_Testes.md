# Engenharia de Requisitos & Modelagem de Cenários de Testes

## Contexto da História de Usuário
**US-042:** Como um aluno interessado em adquirir cursos na plataforma de ensino online,  
Quero realizar o pagamento das minhas compras utilizando minha conta PayPal,  
Para que eu tenha uma opção de pagamento rápida, segura e sem a necessidade de digitar os dados do meu cartão diretamente no site.

---

## 1. Suíte de Cenários de Testes (Sintaxe Gherkin / BDD)

### Cenário 1: Caminho Feliz - Pagamento bem-sucedido via PayPal
* **Tipo:** Caminho Feliz (E2E)
* **Objetivo:** Validar a compra completa com sucesso e liberação imediata do acesso.

```gherkin
Dado que o aluno está na tela de Checkout com um curso adicionado ao carrinho
Quando o aluno seleciona a opção "PayPal" e clica no botão "Concluir Compra"
E realiza a autenticação e confirmação do pagamento com sucesso no ambiente do PayPal
E é redirecionado de volta para a plataforma de ensino
Então o sistema deve exibir a página de sucesso com o status "Pagamento Aprovado"
E o acesso ao curso deve ser liberado imediatamente na conta do aluno
E os dados da transação (ID do pedido, ID da transação PayPal, valor, moeda BRL e data/hora) devem ser registrados corretamente no banco de dados
```

---

### Cenário 2: Exceção - Transação recusada pelo PayPal
* **Tipo:** Fluxo de Exceção / Falha
* **Objetivo:** Garantir a integridade do carrinho e exibição de mensagem adequada ao usuário em caso de saldo insuficiente ou falha no processamento.

```gherkin
Dado que o aluno está na tela de Checkout com um curso no carrinho
Quando o aluno seleciona "PayPal", clica em "Concluir Compra" e a transação é recusada pelo PayPal
Então o sistema deve redirecionar o aluno de volta para a tela de Checkout
E deve exibir uma mensagem amigável informando a recusa do pagamento
E os itens devem permanecer salvos no carrinho de compras
```

---

### Cenário 3: Cancelamento - Usuário cancela o fluxo no ambiente do PayPal
* **Tipo:** Cancelamento / Fluxo Alternativo
* **Objetivo:** Garantir o correto tratamento quando o cliente desiste da compra durante o fluxo externo.

```gherkin
Dado que o aluno iniciou o fluxo de pagamento via PayPal no checkout
Quando o aluno clica no botão de fechar ou cancelar dentro da janela/pop-up do PayPal antes de concluir
Então o sistema deve retornar o usuário para a tela de Checkout da plataforma
E deve exibir uma mensagem amigável de que a operação foi cancelada
E o carrinho de compras deve manter os itens intactos para uma nova tentativa
```

---

### Cenário 4: Notificação Assíncrona - Liberação via Webhook/IPN do PayPal
* **Tipo:** Notificação Assíncrona / Integração Backend
* **Objetivo:** Validar a atualização do status do pedido e liberação via webhook sem dependência exclusiva da interface visual.

```gherkin
Dado que um pedido via PayPal foi gerado e está com o status "Pendente" na plataforma
Quando o servidor do PayPal envia uma notificação assíncrona de confirmação de pagamento (Webhook/IPN) válida para o endpoint da plataforma
Então o sistema deve processar a notificação com sucesso
E atualizar o status do pedido para "Aprovado"
E disparar a liberação automática do acesso ao curso para o aluno
```

---

### Cenário 5: Concorrência - Múltiplas tentativas simultâneas de checkout
* **Tipo:** Concorrência / Stress Funcional
* **Objetivo:** Validar a integridade dos dados e prevenir duplicação de transações ou cobranças indevidas.

```gherkin
Dado que o aluno possui um curso no carrinho e abre duas abas distintas do navegador no checkout
Quando o aluno tenta iniciar o processo de pagamento via PayPal simultaneamente em ambas as abas
Então o sistema deve gerenciar a concorrência de forma segura bloqueando transações duplicadas indevidas
E garantir que apenas uma sessão de pagamento seja processada corretamente sem corromper os dados do pedido
```

---

### Cenário 6: Interface - Exibição correta do meio de pagamento
* **Tipo:** Interface / UI (Smoke Test)
* **Objetivo:** Garantir a presença correta do componente visual no Checkout.

```gherkin
Dado que o aluno acessa a tela de Checkout de um curso na plataforma
Então o sistema deve exibir a opção "PayPal" visível e estruturada ao lado dos demais métodos tradicionais (Cartão de Crédito e Pix)
```

---

## 2. Estratégia de Priorização para Automação na Pipeline de CI/CD

### 🚀 Alta Prioridade (Executar na Pipeline CI/CD - PR / Deploy):
1. **Cenário 1 (Caminho Feliz):** É a principal via de receita da funcionalidade. Um erro nesse fluxo bloqueia compras na plataforma.
2. **Cenário 4 (Webhook/IPN):** Crítico para a entrega assíncrona do serviço. Testes automatizados de API garantem que alterações no backend não quebrem a integração com os eventos do PayPal.
3. **Cenário 6 (Interface UI):** Teste rápido de fumaça (*Smoke Test*) para assegurar que a opção não desapareça visualmente do checkout.

### ⏳ Média / Baixa Prioridade (Testes Agendados Noturnos ou Validações Manuais):
* **Cenários 2 e 3 (Recusa e Cancelamento):** Dependem muito do comportamento e latência do pop-up/sandbox externo do PayPal. Automatizar o E2E puro em pipeline pode gerar falsos negativos (flaky tests). Podem ser validados via mocks no nível de API/unitário no CI/CD e manualmente no E2E.
* **Cenário 5 (Concorrência):** Requer setup complexo de concorrência e massa de testes, sendo ideal para suítes específicas de carga/stress (ex: JMeter/K6), fora da esteira de deploy rápido.