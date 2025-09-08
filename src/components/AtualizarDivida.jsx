import { useState } from 'react';
import { registrarDivida, registrarPagamento, obterHistorico } from '../api/clienteAPI';

export default function AtualizarDivida({ aggregateId, onAtualizado }) {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [novaDivida, setNovaDivida] = useState('');
  const [novoPagamento, setNovoPagamento] = useState('');

  const handleAdicionarDivida = async () => {
    if (!novaDivida) return;
    await registrarDivida(aggregateId, parseFloat(novaDivida));
    const res = await obterHistorico(aggregateId);
    onAtualizado(res.data);
    setNovaDivida('');
  };

  const handleAdicionarPagamento = async () => {
    if (!novoPagamento) return;
    await registrarPagamento(aggregateId, parseFloat(novoPagamento));
    const res = await obterHistorico(aggregateId);
    onAtualizado(res.data);
    setNovoPagamento('');
  };

  return (
    <div className="atualizar-divida-bloco">
      <button onClick={() => setMostrarForm(!mostrarForm)}>
        {mostrarForm ? '-' : '+'} Atualizar Dívida / Pagamento
      </button>

      {mostrarForm && (
        <div className="form-linha">
          <div className="form-item">
            <input
              type="number"
              placeholder="Valor da dívida"
              value={novaDivida}
              onChange={e => setNovaDivida(e.target.value)}
            />
            <button onClick={handleAdicionarDivida}>Adicionar Dívida</button>
          </div>

          <div className="form-item">
            <input
              type="number"
              placeholder="Valor do pagamento"
              value={novoPagamento}
              onChange={e => setNovoPagamento(e.target.value)}
            />
            <button onClick={handleAdicionarPagamento}>Registrar Pagamento</button>
          </div>
        </div>
      )}
    </div>
  );
}
