import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/authAPI';

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
      navigate('/cadastro');
    } catch (error) {
      console.error(error);
      alert('Erro ao realizar login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-bloco">
      <h2>Entrar no Sistema</h2>
      <form onSubmit={handleLogin}>
        <div className="form-item">
          <label>E-mail</label>
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-item">
          <label>Senha</label>
          <input
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <p style={{ marginTop: '16px', textAlign: 'center' }}>
        Não tem uma conta? <Link to="/registrar">Registre-se aqui</Link>
      </p>
    </div>
  );
}

export default Login;
