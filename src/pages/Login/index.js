// src/components/Login.js
import React, { useState , useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/login.css';
import { AuthContext } from '../../context/auth';
import Img from '../../img/img.png';


const Login = () => {
  const { SignIn, signed } = useContext(AuthContext);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
		if (signed) {
			navigate("/home");
		}
	}, [signed, navigate]);

  const handleSignIn = async (e) => {
		e.preventDefault();
	
		try {
      console.log(nomeUsuario, senha)
			await SignIn(nomeUsuario, senha);
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

  return (
    <div className="main-login">
      <div className="left-login">
        <h1>Faça seu login<br />E entre para o nosso time</h1>
        <img src={Img} alt="Home" />
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
          <button className="btn-login" type="button" onClick={handleSignIn}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
