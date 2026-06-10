# Bar da Filó - Frontend

Interface web desenvolvida em React para consumo da API de Controle de Fiado do Bar da Filó.

O sistema permite cadastrar clientes, registrar dívidas e pagamentos, consultar saldos e visualizar o histórico completo de eventos de cada cliente.

## Funcionalidades

* Cadastro de clientes
* Busca de clientes por nome ou CPF
* Registro de dívidas
* Registro de pagamentos
* Seleção da forma de pagamento
* Consulta do saldo atual
* Visualização do histórico completo de eventos
* Integração com a API de Event Sourcing

## Tecnologias Utilizadas

* React
* JavaScript
* Axios
* Vite
* CSS

## Estrutura do Projeto

```text
src
├── api
│   └── clienteAPI.js
│
├── components
│   ├── AtualizarDivida.jsx
│   ├── ClienteCard.jsx
│   ├── FormCliente.jsx
│   └── HistoricoCliente.jsx
│
├── pages
│
├── App.jsx
└── main.jsx
```

> A estrutura pode variar conforme a evolução do projeto.

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3001
```

Essa variável define a URL base da API backend.

## Instalação

Instale as dependências:

```bash
npm install
```

## Executando o Projeto

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Por padrão, a aplicação ficará disponível em:

```text
http://localhost:5173
```

## Integração com o Backend

Este frontend depende da API do projeto:

**Bar da Filó - Backend**

Certifique-se de que a API esteja em execução antes de utilizar a interface.

Exemplo:

```bash
npm run start
```

Backend:

```text
http://localhost:3001
```

Frontend:

```text
http://localhost:5173
```

## Fluxo de Utilização

### 1. Cadastrar Cliente

Informe:

* Nome
* Sobrenome
* Telefone
* CPF
* E-mail

A API criará um novo cliente e armazenará o evento:

```text
CLIENTE_CADASTRADO
```

---

### 2. Registrar Dívida

Informe:

* Valor
* Descrição

A API registrará o evento:

```text
DIVIDA_REGISTRADA
```

Exemplo:

```text
R$ 25,00
Descrição: Refrigerante e salgados
```

---

### 3. Registrar Pagamento

Informe:

* Valor
* Forma de pagamento

Formas disponíveis:

* PIX
* DINHEIRO
* CREDITO

A API registrará o evento:

```text
PAGAMENTO_EFETUADO
```

Quando o pagamento é realizado por crédito, a taxa da operadora é considerada pela regra de negócio da API.

---

### 4. Consultar Histórico

Ao selecionar um cliente, a aplicação consulta:

```http
GET /clientes/:id/eventos
```

Retornando:

* Histórico completo de eventos
* Saldo atualizado do cliente

## Exemplo de Histórico

```text
CLIENTE_CADASTRADO

DIVIDA_REGISTRADA
Valor: R$ 50,00

DIVIDA_REGISTRADA
Valor: R$ 20,00

PAGAMENTO_EFETUADO
Valor: R$ 30,00
Forma: PIX
```

Saldo:

```text
R$ 40,00
```

## Arquitetura

A aplicação segue uma estrutura simples baseada em componentes React.

### Camada de API

Responsável pela comunicação com o backend através do Axios.

Exemplo:

```js
registrarDivida()
registrarPagamento()
obterHistorico()
localizarClientes()
```

### Componentes

Responsáveis pela interface e interação do usuário.

### Backend

Toda a regra de negócio permanece no backend, incluindo:

* Validações
* Cálculo de saldo
* Regras de pagamento
* Event Sourcing

O frontend atua apenas como camada de apresentação.

## Melhorias Futuras

* Gerenciamento de estado global
* Feedback visual para operações
* Tratamento padronizado de erros
* Responsividade para dispositivos móveis
* Paginação do histórico
* Dashboard com métricas financeiras
