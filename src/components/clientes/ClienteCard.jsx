import { Link } from "react-router-dom";

import {
  Card,
  Button
} from "../ui";

function ClienteCard({ cliente }) {
        console.log({cliente})
  return (
    <Card key={cliente._id}>

      <h3>
        {cliente.event_data.nome} {cliente.event_data.sobrenome}
      </h3>

      <p>
        <strong>CPF:</strong> {cliente.event_data.cpf}
      </p>

      <p>
        <strong>Telefone:</strong> {cliente.event_data.telefone}
      </p>

      <p>
        <strong>Email:</strong> {cliente.event_data.email}
      </p>

      <div className="cliente-card-acoes">

        <Link to={`/clientes/${cliente.aggregate_id}`}>
          <Button type="button">
            Ver Histórico
          </Button>
        </Link>

      </div>

    </Card>
  );
}

export default ClienteCard;