import axios from 'axios';

const API_URL = 'http://localhost:3001/clientes';

//Cadastrar e localixar user
export const criarCliente = (data) => axios.post(API_URL, data);
export const localizarClientes = (nome) => axios.get(`${API_URL}/localizar`, { params: { nome } });

//trazer historico
export const obterHistorico = (aggregate_id) => axios.get(`${API_URL}/historico`, { params: { aggregate_id } }); 

//Atulizar valores
export const registrarDivida = (aggregate_id, valor) => axios.post(`${API_URL}/divida`, { aggregate_id, valor });
export const registrarPagamento = (aggregate_id, valor) => axios.post(`${API_URL}/pagamento`, { aggregate_id, valor });
