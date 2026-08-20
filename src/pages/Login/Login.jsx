import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../api/authAPI';


import {
  Button,
  Input,
  FormField,
  Card
} from '../../components/ui';

function Login({ setLogado }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login({ email, senha });
      localStorage.setItem('token', response.data.data.token);
      setLogado(true);
      alert('Login realizado com sucesso!');
      navigate('/clientes');
    } catch (error) {
      console.error(error);
      alert('Erro ao realizar login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h2>Entrar no Sistema</h2>
      <form onSubmit={handleLogin}>
      <FormField
        label="Email"
        htmlFor="email"
      >
        <Input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required>
        </Input>
      </FormField>

      <FormField
        label="Senha"
        htmlFor="senha"
      >
        <Input
          type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required>
        </Input>
      </FormField>

      <Button
      type="submit"
          disabled={loading}
      > {loading
            ? 'Realizando Acesso...'
            : 'Acessar'
          }</Button>

      </form>
      <p>
        Não tem uma conta?{' '}

        <Link to="/register">
          Faça cadastro aqui
        </Link>
      </p>
    </Card>
  )
}

export default Login;
