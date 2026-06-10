import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/clientes";

// cadastrar cliente
export const criarCliente = (data) => {
  return axios.post(API_URL, data);
};

// localizar clientes
export const localizarClientes = (nome, cpf) => {
  return axios.get(`${API_URL}/`, {
    params: { nome, cpf },
  });
};

// obter histórico
export const obterHistorico = (aggregate_id) => {
  return axios.get(`${API_URL}/${aggregate_id}/eventos`);
};

// registrar dívida
export const registrarDivida = (
  aggregate_id,
  valor,
  descricao
) => {
  return axios.post(
    `${API_URL}/${aggregate_id}/dividas`,
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

  console.log(
    "Registrando pagamento:",
    {
      aggregate_id,
      valor,
      forma_pagamento
    }
  );

  return axios.post(
    `${API_URL}/${aggregate_id}/pagamentos`,
    {
      valor,
      forma_pagamento
    }
  );
};