// src/components/UsuarioForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../css/cadastro.css';

const UsuarioForm = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Editar usuário existente
      fetch(`http://localhost:3002/usuarios/${id}`)
        .then(response => response.json())
        .then(usuario => {
          setNomeUsuario(usuario.NomeUsuario);
          setEmail(usuario.Email);
          setRole(usuario.Role);
        })
        .catch(error => console.error('Erro ao carregar usuário:', error));
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const usuarioData = { NomeUsuario: nomeUsuario, Senha: senha, Email: email, Role: role };

    const url = id
      ? `http://localhost:3002/usuarios/${id}`
      : 'http://localhost:3002/usuarios';

    const method = id ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuarioData),
    })
      .then(() => {
        alert(id ? 'Usuário atualizado com sucesso' : 'Usuário criado com sucesso');
        navigate('/lista-usuarios');
      })
      .catch(error => console.error('Erro ao salvar usuário:', error));
  };

  return (
    <div>
      <h1>Cadastro/Edição de Usuário</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nomeUsuario">Nome de Usuário:</label>
        <input
          type="text"
          id="nomeUsuario"
          name="nomeUsuario"
          value={nomeUsuario}
          onChange={(e) => setNomeUsuario(e.target.value)}
          required
        />

        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          name="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Salvar</button>
      </form>

      <button onClick={() => navigate('/lista-usuario')}>Voltar para a Lista</button>
      <button onClick={() => navigate('/home')}>Home</button>
    </div>
  );
};

export default UsuarioForm;
