export interface Cliente {
  nome: string;
  sobrenome: string;
  telefone: string;
  cpf: string;
  email: string;
}

export interface Evento {
  aggregate_id: string;
  event_type: string;
  event_data: any;
  created_at: string;
}

export interface HistoricoResponse {
  historico: Evento[];
  saldo: number;
}