import { useState } from "react";
import { criarCliente } from "../../api/clienteAPI";
import ClientForm from "../../components/clientes/ClientForm";

function CadastroCliente() {
  const [loading, setLoading] = useState(false);

  const handleCadastrar = async (cliente) => {
    setLoading(true);

    try {
      await criarCliente(cliente);

      alert("Cliente cadastrado com sucesso!");

    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar cliente.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientForm
      onSubmit={handleCadastrar}
      loading={loading}
      titulo="Cadastrar Cliente"
    />
  );
}

export default CadastroCliente;