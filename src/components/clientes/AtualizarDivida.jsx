import { useState } from "react";

import {
  registrarDivida,
  registrarPagamento,
  obterHistorico
} from "../../api/clienteAPI";

import {
  Button,
  Input,
  FormField,
  Card
} from "../ui";

export default function AtualizarDivida({
  aggregateId,
  onAtualizado
}) {
  const [mostrarForm, setMostrarForm] = useState(false);

  const [novaDivida, setNovaDivida] = useState("");
  const [descricaoDivida, setDescricaoDivida] = useState("");

  const [novoPagamento, setNovoPagamento] = useState("");
  const [novaFormaPagamento, setNovaFormaPagamento] =
    useState("PIX");

  const [loadingDivida, setLoadingDivida] =
    useState(false);

  const [loadingPagamento, setLoadingPagamento] =
    useState(false);

  const atualizarHistorico = async () => {
    const response =
      await obterHistorico(aggregateId);

    onAtualizado(response.data);
  };

  const handleAdicionarDivida = async (e) => {
    e.preventDefault();

    const valor = Number(novaDivida);

    if (isNaN(valor) || valor <= 0) {
      alert(
        "Informe um valor de dívida maior que zero."
      );

      return;
    }

    setLoadingDivida(true);

    try {
      await registrarDivida(
        aggregateId,
        valor,
        descricaoDivida.trim()
      );

      await atualizarHistorico();

      setNovaDivida("");
      setDescricaoDivida("");

      alert("Dívida registrada com sucesso!");

    } catch (error) {
      console.error(error);

      alert("Erro ao registrar dívida.");

    } finally {
      setLoadingDivida(false);
    }
  };

  const handleAdicionarPagamento = async (e) => {
    e.preventDefault();

    const valor = Number(novoPagamento);

    if (isNaN(valor) || valor <= 0) {
      alert(
        "Informe um valor de pagamento maior que zero."
      );

      return;
    }

    setLoadingPagamento(true);

    try {
      await registrarPagamento(
        aggregateId,
        valor,
        novaFormaPagamento
      );

      await atualizarHistorico();

      setNovoPagamento("");

      alert(
        "Pagamento registrado com sucesso!"
      );

    } catch (error) {
      console.error(error);

      alert(
        "Erro ao registrar pagamento."
      );

    } finally {
      setLoadingPagamento(false);
    }
  };

  return (
    <div className="atualizar-divida-bloco">

      <Button
        type="button"
        onClick={() =>
          setMostrarForm(!mostrarForm)
        }
      >
        {mostrarForm ? "-" : "+"}{" "}
        Atualizar Dívida / Pagamento
      </Button>

      {mostrarForm && (

        <div className="form-linha">

          <Card>

            <h3>Adicionar Dívida</h3>

            <form
              onSubmit={handleAdicionarDivida}
            >

              <FormField
                label="Valor da dívida"
                htmlFor="valor-divida"
              >
                <Input
                  id="valor-divida"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Valor da dívida"
                  value={novaDivida}
                  onChange={(e) =>
                    setNovaDivida(
                      e.target.value
                    )
                  }
                  required
                />
              </FormField>

              <FormField
                label="Descrição"
                htmlFor="descricao-divida"
              >
                <Input
                  id="descricao-divida"
                  type="text"
                  placeholder="Descrição da dívida"
                  value={descricaoDivida}
                  onChange={(e) =>
                    setDescricaoDivida(
                      e.target.value
                    )
                  }
                  required
                />
              </FormField>

              <Button
                type="submit"
                disabled={loadingDivida}
              >
                {loadingDivida
                  ? "Registrando..."
                  : "Adicionar Dívida"}
              </Button>

            </form>

          </Card>

          <Card>

            <h3>Registrar Pagamento</h3>

            <form
              onSubmit={
                handleAdicionarPagamento
              }
            >

              <FormField
                label="Valor do pagamento"
                htmlFor="valor-pagamento"
              >
                <Input
                  id="valor-pagamento"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Valor do pagamento"
                  value={novoPagamento}
                  onChange={(e) =>
                    setNovoPagamento(
                      e.target.value
                    )
                  }
                  required
                />
              </FormField>

              <FormField
                label="Forma de pagamento"
                htmlFor="forma-pagamento"
              >
                <select
                  id="forma-pagamento"
                  value={
                    novaFormaPagamento
                  }
                  onChange={(e) =>
                    setNovaFormaPagamento(
                      e.target.value
                    )
                  }
                >
                  <option value="PIX">
                    PIX
                  </option>

                  <option value="DINHEIRO">
                    Dinheiro
                  </option>

                  <option value="CREDITO">
                    Crédito
                  </option>
                </select>
              </FormField>

              <Button
                type="submit"
                disabled={
                  loadingPagamento
                }
              >
                {loadingPagamento
                  ? "Registrando..."
                  : "Registrar Pagamento"}
              </Button>

            </form>

          </Card>

        </div>
      )}

    </div>
  );
}