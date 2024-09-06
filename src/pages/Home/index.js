import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/estilo.css';
import logoImg from '../../img/logo.png';
import homeImg from '../../img/botao-home.png';
import ajudaImg from '../../img/ajuda.png';
import telefoneImg from '../../img/telefone.png';
import servicoImg from '../../img/servico-tecnico.png';

const Home = () => {
  return (
    <div className="layout">
      <div 
        className="background-image" 
        style={{ backgroundImage: `url(${logoImg})`, backgroundSize: '50%' }}
      >
        <header>
          <nav className="sidebar">
            <ul>
              <li className="icon-item">
                <img src={homeImg} alt="Home" />
                <Link to="/">Home</Link>
              </li>
              <li className="icon-item">
                <img src={ajudaImg} alt="Ajuda" />
                <Link to="/ajuda">Ajuda</Link>
              </li>
              <li className="icon-item">
                <img src={telefoneImg} alt="Contato" />
                <Link to="/contato">Contato</Link>
              </li>
              <li className="icon-item">
                <img src={servicoImg} alt="Serviços" />
                <Link to="/servicos">Serviços</Link>
              </li>
            </ul>
          </nav>
          <nav className="topbar">
            <ul>
              <li><Link to="/cadastro-cliente">Cadastrar Cliente</Link></li>
              <li><Link to="/cadastro-carro">Cadastrar Veículo</Link></li>
              <li><Link to="/cadastro-venda">Fazer Venda</Link></li>
              <li><Link to="/cadastro-usuario">Cadastrar Usuário</Link></li>
              <li><Link to="/lista-clientes">Listar Clientes</Link></li>
              <li><Link to="/lista-carros">Listar Veículos</Link></li>
              <li><Link to="/lista-vendas">Relatório de Vendas</Link></li>
              <li><Link to="/lista-usuario">Lista Usuário</Link></li>
              
            </ul>
          </nav>
        </header>
        <footer>
          <p>©️mateus00dias</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
