// src/components/ListaUsuarios.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/lista.css';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3002/usuarios')
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Erro ao carregar usuários:', error));
  }, []);

  const editarUsuario = (id) => {
    navigate(`/cadastro-usuario/${id}`);
  };

  const excluirUsuario = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/usuarios/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Usuário excluído com sucesso');
        setUsuarios(usuarios.filter(usuario => usuario.ID_Usuario !== id));
      } else {
        const errorMessage = await response.text();
        throw new Error(`Erro ao excluir usuário: ${errorMessage}`);
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir usuário. Consulte o console para obter mais informações.');
    }
  };

  return (
    <div>
      <h1>Listagem de Usuários</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome de Usuário</th>
            <th>Email</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.ID_Usuario}>
              <td>{usuario.ID_Usuario}</td>
              <td>{usuario.NomeUsuario}</td>
              <td>{usuario.Email}</td>
              <td>{usuario.Role}</td>
              <td>
                <button onClick={() => editarUsuario(usuario.ID_Usuario)}>Editar</button>
                <button onClick={() => excluirUsuario(usuario.ID_Usuario)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/cadastro-usuario')}>Novo Usuário</button>
      <button onClick={() => navigate('/home')}>Home</button>
    </div>
  );
};

export default ListaUsuarios;
