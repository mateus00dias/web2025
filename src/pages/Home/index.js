import { useContext } from "react";
import { Link } from 'react-router-dom';
import '../../css/home.css';
import logoImg from '../../img/logo.png';
import { AuthContext } from "../../context/auth";

const Home = () => {
  const { signout } = useContext(AuthContext);

  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">
          <img src={logoImg} alt="LuxuryCar" />
          
        </div>
        <nav className="menu">
          <ul>
            <h1 className="welcome-text">GERENCIAMENTO DE VEÍCULOS - LUXURURYCAR</h1>
            <li><Link to="/cadastro-cliente">Cadastrar Cliente</Link></li>
            <li><Link to="/cadastro-carro">Cadastrar Veículo</Link></li>
            <li><Link to="/cadastro-venda">Fazer Venda</Link></li>
            <li><Link to="/cadastro-usuario">Cadastrar Usuário</Link></li>
            <li><button onClick={signout}>Logout</button></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        
        <div className="action-buttons">
          <Link to="/lista-clientes" className="action-btn">Listar Clientes</Link>
          <Link to="/lista-carros" className="action-btn">Listar Veículos</Link>
          <Link to="/lista-vendas" className="action-btn">Relatório de Vendas</Link>
          <Link to="/lista-usuario" className="action-btn">Lista de Usuários</Link>
        </div>
      </main>

      <footer className="footer">
        <p>©️ LuxuryCar - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default Home;
