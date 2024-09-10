// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadastroCliente from './pages/Cliente/ClienteForm';
import ListaClientes from './pages/Cliente/ListaClientes';
import CarroForm from './pages/Veiculo/CarroForm';
import ListaCarros from './pages/Veiculo/ListaCarros';
import VendaForm from './pages/Venda/VendaForm';
import ListaVendas from './pages/Venda/ListaVenda';
import Login from './pages/Login';
import Home from './pages/Home';
import UsuarioForm from './pages/Usuario/UsuarioForm';
import ListaUsuarios from './pages/Usuario/ListaUsuarios';
import { AuthProvider } from './context/auth'; // Import AuthProvider
import useAuth from "./hooks/useAuth";

const Private = ({ Item }) => {
	const { signed } = useAuth();

	return signed > 0 ? <Item /> : < Login/>;
};

function App() {
  
  return (
    <AuthProvider> {/* Wrap your Routes with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Private Item={Home} />} />
          <Route path="/cadastro-cliente/:id?" element={<Private Item={CadastroCliente} />} />
          <Route path="/lista-clientes" element={<Private Item={ListaClientes} />} />
          <Route path="/cadastro-usuario/:id?" element={<Private Item={UsuarioForm} />} />
          <Route path="/lista-usuario/:id?" element={<Private Item={ListaUsuarios} />} />
          <Route path="/cadastro-carro/:id?" element={<Private Item={CarroForm} />} />
          <Route path="/lista-carros" element={<Private Item={ListaCarros} />} />
          <Route path="/cadastro-venda/:id?" element={<Private Item={VendaForm} />} />
          <Route path="/lista-vendas" element={<Private Item={ListaVendas} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
