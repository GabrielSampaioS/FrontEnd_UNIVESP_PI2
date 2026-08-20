import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../api/authAPI';

import {
  Button,
  Input,
  FormField,
  Card
} from '../../components/ui';


function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

      await register({
        nome,
        email,
        senha
      });

      alert(
        'Usuário criado com sucesso! Agora você pode fazer login.'
      );

      navigate('/login');

    } catch (error) {

      console.error(error);

      alert(
        'Erro ao criar usuário. Verifique os dados e tente novamente.'
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <Card>

      <h2>Criar conta</h2>

      <form onSubmit={handleRegister}>

        <FormField
          label="Nome"
          htmlFor="nome"
        >
          <Input
            id="nome"
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </FormField>


        <FormField
          label="E-mail"
          htmlFor="email"
        >
          <Input
            id="email"
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormField>


        <FormField
          label="Senha"
          htmlFor="senha"
        >
          <Input
            id="senha"
            type="password"
            placeholder="Crie uma senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </FormField>


        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? 'Criando conta...'
            : 'Registrar'
          }
        </Button>

      </form>


      <p>
        Já tem uma conta?{' '}

        <Link to="/login">
          Faça login aqui
        </Link>
      </p>
    </Card>

  );
}


export default Register;