import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { obterHistorico } from "../../api/clienteAPI";

import Clientehistorico from "../../components/clientes/Clientehistorico";
import AtualizarDivida from "../../components/clientes/AtualizarDivida";

import {
  Button,
  Card,
  Loading
} from "../../components/ui";

function ClienteDetalhes() {


  const { aggregateId } = useParams();

  const [dadosCliente, setDadosCliente] = useState({
    historico: [],
    saldo: 0
  });

  const [loading, setLoading] = useState(true);

  const carregarHistorico = async () => {
    try {
      setLoading(true);

      const response = await obterHistorico(aggregateId);

      console.log("RETORNO:", response.data);

      setDadosCliente(response.data);

    } catch (error) {
      console.error(error);
      alert("Erro ao carregar histórico.");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarHistorico();
  }, [aggregateId]);

  if (loading) {
    return <Loading />;
  }
  console.log(dadosCliente)
  return (
    <div>

      <Link to="/clientes">
        <Button type="button">
          Voltar
        </Button>
      </Link>

      <Card>
        <h1>Detalhes do Cliente</h1>

        <p> 
          <strong>Nome:</strong> {dadosCliente.historico[0].event_data.nome + ' ' + dadosCliente.historico[0].event_data.sobrenome}
        </p>

<p>
          <strong>Telefone:</strong> {dadosCliente.historico[0].event_data.telefone }
        </p>

        <p>
          <strong>email:</strong> {dadosCliente.historico[0].event_data.email }
        </p>


        <p>
          <strong>Saldo:</strong>{" "}
          R$ {Number(dadosCliente.saldo).toFixed(2)}
        </p>
      </Card>

      <AtualizarDivida
        aggregateId={aggregateId}
        onAtualizado={setDadosCliente}
      />

      <Clientehistorico
        historico={dadosCliente.historico}
      />

    </div>
  );
}

export default ClienteDetalhes;