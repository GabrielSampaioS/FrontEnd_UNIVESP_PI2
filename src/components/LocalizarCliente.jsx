import { useState } from 'react';
import { localizarClientes, obterHistorico } from '../api/clienteAPI';
import AtualizarDivida from './AtualizarDivida';
import HistoricoCliente from './HistoricoCliente';

export default function LocalizarCliente() {
  const [nomeBusca, setNomeBusca] = useState('');
  const [clientes, setClientes] = useState([]);
  const [historicoPorCliente, setHistoricoPorCliente] = useState({});
  const [mostrarHistoricoId, setMostrarHistoricoId] = useState(null);

  const handleBuscar = async () => {
    const res = await localizarClientes(nomeBusca);
    setClientes(res.data);
    setHistoricoPorCliente({});
    setMostrarHistoricoId(null);
  };

  const handleVerHistorico = async (aggregate_id) => {
    if (mostrarHistoricoId === aggregate_id) {
      setMostrarHistoricoId(null); // esconde se já está aberto
      return;
    }

    const res = await obterHistorico(aggregate_id);
    setHistoricoPorCliente(prev => ({ ...prev, [aggregate_id]: res.data }));
    setMostrarHistoricoId(aggregate_id);
  };

  const handleAtualizado = (aggregate_id, novoHistorico) => {
    setHistoricoPorCliente(prev => ({ ...prev, [aggregate_id]: novoHistorico }));
  };

  return (
    <div className="section-bloco busca">
      <h2>Buscar Cliente</h2>
      <input
        placeholder="Nome do Cliente"
        value={nomeBusca}
        onChange={e => setNomeBusca(e.target.value)}
        className="input-busca"
      />
      <button onClick={handleBuscar} className="btn-busca">Buscar</button>

      <ul className="lista-clientes">
        {clientes.map(c => (
          <li key={c.aggregate_id} className="cliente-card">
            <div className="cliente-header">
              <strong className="cliente-nome">{c.event_data.nome} {c.event_data.sobrenome}</strong>
              <span className="cliente-telefone">{c.event_data.telefone}</span>
            </div>

            <div className="cliente-acoes">
              <AtualizarDivida
                aggregateId={c.aggregate_id}
                onAtualizado={(novoHistorico) => handleAtualizado(c.aggregate_id, novoHistorico)}
              />

              <button 
                onClick={() => handleVerHistorico(c.aggregate_id)} 
                className="btn-historico"
              >
                {mostrarHistoricoId === c.aggregate_id ? 'Esconder Histórico' : 'Ver Histórico'}
              </button>
            </div>

            {mostrarHistoricoId === c.aggregate_id && (
              <HistoricoCliente historico={historicoPorCliente[c.aggregate_id]} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
