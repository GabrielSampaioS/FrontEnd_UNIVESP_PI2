export default function HistoricoCliente({ historico, saldo }) {
  if (!historico || historico.length === 0) return <p>Nenhum histórico encontrado.</p>;

  return (
    <div className="historico-bloco">
      <h4>Histórico do Cliente</h4>
      <ul>
        {historico.map((e, i) => (
          <li key={i}>
            {e.event_type} - 
            {e.event_type === 'ClienteCadastrado'
              ? `${e.event_data.nome} ${e.event_data.sobrenome}`
              : `Valor: R$ ${e.event_data.valor} - Data: ${new Date(e.created_at).toLocaleString()}`}
          </li>
        ))}
      </ul>
      <p><strong>Saldo atual:</strong> R$ {saldo}</p>
    </div>
  );
}