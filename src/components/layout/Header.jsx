import { Link, useNavigate } from "react-router-dom";

function Header({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <header>
      <div className="header">

        <nav className="header-nav">
          <Link to="/clientes/cadastro">
            Cadastrar Cliente
          </Link>

          <Link to="/clientes">
            Localizar Cliente
          </Link>

          <button onClick={handleLogout}>
            Sair
          </button>
        </nav>

      </div>
    </header>
  );
}

export default Header;