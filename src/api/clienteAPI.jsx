import api from "./apiA";

// cadastrar cliente
export const criarCliente = (data) => {
  return api.post("/clientes", data);
};

// localizar clientes
export const localizarClientes = (nome, cpf) => {
  return api.get("/clientes", {
    params: { nome, cpf },
  });
};

// obter histórico
export const obterHistorico = (aggregate_id) => {
  return api.get(`/clientes/${aggregate_id}/eventos`);
};

// registrar dívida
export const registrarDivida = (aggregate_id, valor, descricao) => {
  return api.post(
    `/clientes/${aggregate_id}/dividas`,
    {
      valor,
      descricao,
    }
  );
};

// registrar pagamento
export const registrarPagamento = (
  aggregate_id,
  valor,
  forma_pagamento
) => {
  return api.post(
    `/clientes/${aggregate_id}/pagamentos`,
    {
      valor,
      forma_pagamento,
    }
  );
};