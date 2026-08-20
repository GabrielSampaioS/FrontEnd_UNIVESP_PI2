import { useEffect, useState } from "react";
import { obterClientes } from "../../api/clienteAPI";

import ClienteList from "../../components/clientes/ClienteList";
import Loading from "../../components/ui/Loading";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarClientes = async () => {
      try {
        const response = await obterClientes();

        setClientes(response.data);

      } catch (error) {
        console.error(error);
        alert("Erro ao carregar clientes.");

      } finally {
        setLoading(false);
      }
    };

    carregarClientes();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Clientes</h1>

      <ClienteList clientes={clientes} />
    </div>
  );
}

export default Clientes;