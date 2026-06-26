import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css';
import CadastroCliente from './components/CadastroCliente';
import LocalizarCliente from './components/LocalizarCliente';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [logado, setLogado] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLogado(false);
  };

  return (
    <Router>
      <div className="app-container">
        {/* Header */}
        <header className="saas-header">
          <div className="header-left">
            <h1>Bar da Filó SaaS</h1>
          </div>
          <nav className="header-nav">
            {logado && (
              <>
                <Link to="/cadastro" className="nav-link">Cadastrar Cliente</Link>
                <Link to="/historico" className="nav-link">Histórico / Buscar Cliente</Link>
              </>
            )}
          </nav>

        </header>

        {/* Conteúdo principal */}
        <main className="saas-main">
          <Routes>
            <Route 
              path="/" 
              element={logado ? <Navigate to="/cadastro" /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!logado ? <Login setLogado={setLogado} /> : <Navigate to="/cadastro" />} 
            />
            <Route 
              path="/registrar" 
              element={!logado ? <Register /> : <Navigate to="/cadastro" />} 
            />
            <Route 
              path="/cadastro" 
              element={logado ? <CadastroCliente /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/historico" 
              element={logado ? <LocalizarCliente /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="saas-footer">
          <div className="footer-links">
            {logado ? (
              <>
                <Link to="/cadastro">Cadastrar</Link>
                <Link to="/historico">Buscar</Link>
              </>
            ) : (
              <>
                <Link to="/login">Entrar</Link>
                <Link to="/registrar">Registrar</Link>
              </>
            )}
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
