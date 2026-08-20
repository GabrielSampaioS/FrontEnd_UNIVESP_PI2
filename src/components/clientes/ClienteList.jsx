import ClienteCard from "./ClienteCard";

function ClienteList({ clientes = [] }) {
  if (clientes.length === 0) {
    return (
      <p>
        Nenhum cliente encontrado.
      </p>
    );
  }

  return (
    <div className="cliente-list">

      {clientes.map((cliente) => (
        <ClienteCard
          key={cliente.aggregateId}
          cliente={cliente}
        />
      ))}

    </div>
  );
}

export default ClienteList;