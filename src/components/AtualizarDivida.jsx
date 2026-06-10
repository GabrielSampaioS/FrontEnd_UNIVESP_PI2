import { useState } from "react";
import {
  registrarDivida,
  registrarPagamento,
  obterHistorico
} from "../api/clienteAPI";

export default function AtualizarDivida({
  aggregateId,
  onAtualizado
}) {

  const [mostrarForm, setMostrarForm] = useState(false);

  const [novaDivida, setNovaDivida] = useState("");
  const [descricaoDivida, setDescricaoDivida] = useState("");

  const [novoPagamento, setNovoPagamento] = useState("");
  const [novaFormaPagamento, setNovaFormaPagamento] = useState("PIX");

  const atualizarHistorico = async () => {
    const res = await obterHistorico(aggregateId);
    onAtualizado(res.data);
  };

  const handleAdicionarDivida = async () => {

    const valor = Number(novaDivida);

    if (isNaN(valor) || valor <= 0) {
      alert("Informe um valor de dívida maior que zero.");
      return;
    }

    try {

      await registrarDivida(
        aggregateId,
        valor,
        descricaoDivida.trim()
      );

      await atualizarHistorico();

      setNovaDivida("");
      setDescricaoDivida("");

    } catch (error) {
      alert("Erro ao registrar dívida.");
    }
  };

  const handleAdicionarPagamento = async () => {

    const valor = Number(novoPagamento);

    if (isNaN(valor) || valor <= 0) {
      alert("Informe um valor de pagamento maior que zero.");
      return;
    }

    try {

      await registrarPagamento(
        aggregateId,
        valor,
        novaFormaPagamento
      );

      await atualizarHistorico();

      setNovoPagamento("");

    } catch (error) {
      alert("Erro ao registrar pagamento.");
    }
  };

  return (
    <div className="atualizar-divida-bloco">

      <button
        onClick={() => setMostrarForm(!mostrarForm)}
      >
        {mostrarForm ? "-" : "+"} Atualizar Dívida / Pagamento
      </button>

      {mostrarForm && (

        <div className="form-linha">

          <div className="form-item">

            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Valor da dívida"
              value={novaDivida}
              onChange={(e) => setNovaDivida(e.target.value)}
            />

            <input
              type="text"
              placeholder="Descrição da dívida"
              value={descricaoDivida}
              onChange={(e) => setDescricaoDivida(e.target.value)}
            />

            <button onClick={handleAdicionarDivida}>
              Adicionar Dívida
            </button>

          </div>

          <div className="form-item">

            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Valor do pagamento"
              value={novoPagamento}
              onChange={(e) => setNovoPagamento(e.target.value)}
            />

            <select
              value={novaFormaPagamento}
              onChange={(e) => setNovaFormaPagamento(e.target.value)}
            >
              <option value="PIX">PIX</option>
              <option value="DINHEIRO">Dinheiro</option>
              <option value="CREDITO">Crédito</option>
            </select>

            <button onClick={handleAdicionarPagamento}>
              Registrar Pagamento
            </button>

          </div>

        </div>

      )}

    </div>
  );
}