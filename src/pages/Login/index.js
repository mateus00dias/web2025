// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/login.css';

const Login = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const realizarLogin = async () => {
    try {
      const response = await fetch('http://localhost:3002/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nomeUsuario, senha }),
      });

      if (response.ok) {
        alert('Login realizado com sucesso');
        navigate('/home'); // Redireciona para a página inicial após o login
      } else {
        const errorMessage = await response.text();
        throw new Error(`Erro ao realizar login: ${errorMessage}`);
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao realizar login. Consulte o console para obter mais informações.');
    }
  };

  return (
    <div className="main-login">
      <div className="left-login">
        <h1>Faça seu login<br />E entre para o nosso time</h1>
        <img src="Front/img/img.png" className="left-login-img" alt="Animação" />
      </div>
      <div className="right-login">
        <div className="card-login">
          <h1>Login</h1>
          <div className="textfield">
            <label htmlFor="NomeUsuario">Nome de Usuário:</label>
            <input
              type="text"
              id="NomeUsuario"
              name="NomeUsuario"
              value={nomeUsuario}
              onChange={(e) => setNomeUsuario(e.target.value)}
              required
            />
          </div>
          <div className="textfield">
            <label htmlFor="Senha">Senha:</label>
            <input
              type="password"
              id="Senha"
              name="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button className="btn-login" type="button" onClick={realizarLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
