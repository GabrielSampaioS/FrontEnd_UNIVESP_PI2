export default function HistoricoCliente({ historico, saldo }) {
  if (!historico || historico.length === 0) {
    return <p>Nenhum histórico encontrado.</p>;
  }

  return (
    <div className="historico-bloco">
      <h4>Histórico do Cliente</h4>
      <ul>
        {historico.map((e, i) => (
          <li key={i}>
            {e.event_type === 'ClienteCadastrado' && (
              <>
                ClienteCadastrado - {e.event_data.nome} {e.event_data.sobrenome}
              </>
            )}

            {e.event_type === 'DividaRegistrada' && (
              <>
                Dívida Registrada - Valor: R$ {e.event_data.valor} - Data:{" "}
                {new Date(e.created_at).toLocaleString()}
              </>
            )}

            {e.event_type === 'PagamentoEfetuado' && (
              <>
                Pagamento Efetuado - Valor abatido: R$ {e.event_data.valor_abatido} -
                Forma de pagamento: {e.event_data.forma_pagamento} - Data:{" "}
                {new Date(e.created_at).toLocaleString()}
              </>
            )}
          </li>
        ))}
      </ul>

      <p>
        <strong>Dívida Atual:</strong> R$ {saldo}
      </p>
    </div>
  );
}