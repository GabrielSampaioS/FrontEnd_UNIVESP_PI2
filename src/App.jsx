import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css';
import CadastroCliente from './components/CadastroCliente';
import LocalizarCliente from './components/LocalizarCliente';

function App() {
  const [logado, setLogado] = useState(false);

  return (
    <Router>
      <div className="app-container">
        {/* Header */}
        <header className="saas-header">
          <div className="header-left">
            <h1>Bar da Filó SaaS</h1>
          </div>
          <nav className="header-nav">
            <Link to="/cadastro" className="nav-link">Cadastrar Cliente</Link>
            <Link to="/historico" className="nav-link">Histórico / Buscar Cliente</Link>
          </nav>
          <div className="header-right">
            <button onClick={() => setLogado(!logado)}>
              {logado ? 'Sair' : 'Entrar'}
            </button>
          </div>
        </header>

        {/* Conteúdo principal */}
        <main className="saas-main">
          <Routes>
            <Route path="/" element={<Navigate to="/cadastro" />} />
            <Route path="/cadastro" element={<CadastroCliente />} />
            <Route path="/historico" element={<LocalizarCliente />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="saas-footer">
          <div className="footer-links">
            <Link to="/cadastro">Cadastrar</Link>
            <Link to="/historico">Buscar</Link>
            <a href="#">Suporte</a>
            <a href="#">Termos</a>
          </div>
          <p>© 2025 Bar da Filó SaaS. Todos os direitos reservados.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
