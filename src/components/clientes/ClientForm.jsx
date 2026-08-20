import { useState } from "react";

import {
  Button,
  Input,
  FormField,
  Card
} from "../ui";

function ClientForm({
  clienteInicial = {},
  onSubmit,
  loading = false,
  titulo = "Cadastrar Cliente"
}) {
  const [nome, setNome] = useState(clienteInicial.nome || "");
  const [sobrenome, setSobrenome] = useState(
    clienteInicial.sobrenome || ""
  );
  const [telefone, setTelefone] = useState(
    clienteInicial.telefone || ""
  );
  const [cpf, setCpf] = useState(clienteInicial.cpf || "");
  const [email, setEmail] = useState(clienteInicial.email || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSubmit({
      nome,
      sobrenome,
      telefone,
      cpf,
      email
    });
  };

  return (
    <Card>
      <h2>{titulo}</h2>

      <form onSubmit={handleSubmit}>

        <FormField
          label="Nome"
          htmlFor="nome"
        >
          <Input
            id="nome"
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </FormField>

        <FormField
          label="Sobrenome"
          htmlFor="sobrenome"
        >
          <Input
            id="sobrenome"
            type="text"
            placeholder="Sobrenome"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            required
          />
        </FormField>

        <FormField
          label="Telefone"
          htmlFor="telefone"
        >
          <Input
            id="telefone"
            type="tel"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </FormField>

        <FormField
          label="CPF"
          htmlFor="cpf"
        >
          <Input
            id="cpf"
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </FormField>

        <FormField
          label="Email"
          htmlFor="email"
        >
          <Input
            id="email"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormField>

        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Cadastrar"}
        </Button>

      </form>
    </Card>
  );
}

export default ClientForm;