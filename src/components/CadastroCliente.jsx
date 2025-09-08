import { useState } from 'react';
import { criarCliente } from '../api/clienteAPI';

export default function CadastroCliente() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');

  const handleCadastrar = async () => {
    try {
      await criarCliente({ nome, sobrenome, telefone, cpf, email });
      alert('Cliente cadastrado com sucesso!');
      setNome(''); setSobrenome(''); setTelefone(''); setCpf(''); setEmail('');
    } catch {
      alert('Erro ao cadastrar cliente');
    }
  };

  return (
    <div>
      <h2>Cadastrar Cliente</h2>
      <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
      <input placeholder="Sobrenome" value={sobrenome} onChange={e => setSobrenome(e.target.value)} />
      <input placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />
      <input placeholder="CPF" value={cpf} onChange={e => setCpf(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={handleCadastrar}>Cadastrar</button>
    </div>
  );
}
