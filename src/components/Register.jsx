import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/authAPI';

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
      await register({ nome, email, senha });
      alert('Usuário criado com sucesso! Agora você pode fazer login.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Erro ao criar usuário. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-bloco">
      <h2>Criar Conta</h2>
      <form onSubmit={handleRegister}>
        <div className="form-item">
          <label>Nome</label>
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
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
            placeholder="Crie uma senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Criando conta...' : 'Registrar'}
        </button>
      </form>
      <p style={{ marginTop: '16px', textAlign: 'center' }}>
        Já tem uma conta? <Link to="/login">Faça login aqui</Link>
      </p>
    </div>
  );
}

export default Register;
