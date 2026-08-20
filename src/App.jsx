import { useState } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import Clientes from "./pages/Clientes/Clientes";
import CadastroCliente from "./pages/Clientes/CadastroCliente";
import ClienteDetalhes from "./pages/Clientes/ClienteDetalhes";

import AppLayout from "./components/layout/AppLayout";

function App() {
  const [logado, setLogado] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogado(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}

        <Route path="/login" element={<Login setLogado={setLogado} />} />

        {/* REGISTRO */}

        <Route path="/register" element={<Register />} />

        {/* ÁREA LOGADA */}

        <Route element={<AppLayout onLogout={handleLogout} />}>
          <Route path="/clientes" element={<Clientes />} />

          <Route path="/clientes/cadastro" element={<CadastroCliente />} />

          <Route path="/clientes/:aggregateId" element={<ClienteDetalhes />} />
        </Route>

        {/* ROTA INICIAL */}

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
