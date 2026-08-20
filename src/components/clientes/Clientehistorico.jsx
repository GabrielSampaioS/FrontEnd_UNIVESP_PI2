import { Card } from "../ui";

function Clientehistorico({ historico = [] }) {

  if (historico.length === 0) {
    return (
      <Card>
        <p>Nenhum histórico encontrado.</p>
      </Card>
    );
  }

  return (
    <Card>

      <h2>Histórico do Cliente</h2>

      <div className="cliente-historico">

        {historico.map((evento, index) => (

          <div
            className="historico-item"
            key={evento._id || index}
          >

            <p>
              <strong>Tipo:</strong>{" "}
              {evento.event_type}
            </p>

            <p>
              <strong>Valor:</strong>{" "}
              R${" "}
              {Number(
                evento.event_data?.valor || 0
              ).toFixed(2)}
            </p>

            {evento.event_data?.descricao && (
              <p>
                <strong>Descrição:</strong>{" "}
                {evento.event_data.descricao}
              </p>
            )}

            {evento.event_data?.formaPagamento && (
              <p>
                <strong>Pagamento:</strong>{" "}
                {evento.event_data.formaPagamento}
              </p>
            )}

            <p>
              <strong>Data:</strong>{" "}
              {new Date(
                evento.created_at
              ).toLocaleString("pt-BR")}
            </p>

          </div>

        ))}

      </div>

    </Card>
  );
}

export default Clientehistorico;