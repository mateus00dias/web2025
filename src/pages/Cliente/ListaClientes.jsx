import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/lista.css';

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = () => {
    fetch('http://localhost:3002/clientes')
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error('Erro ao carregar clientes:', error));
  };

  const editarCliente = (id) => {
    navigate(`/cadastro-cliente?id=${id}`);
  };

  const excluirCliente = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/clientes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Cliente excluído com sucesso');
        carregarClientes();
      } else {
        throw new Error('Erro ao excluir cliente');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir cliente. Consulte o console para mais informações.');
    }
  };

  return (
    <div>
      <h1>Listagem de Clientes</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF/CNPJ</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.ID_Cliente}>
              <td>{cliente.ID_Cliente}</td>
              <td>{cliente.Nome}</td>
              <td>{cliente.CPF_CNPJ}</td>
              <td>{cliente.Endereco}</td>
              <td>{cliente.Telefone}</td>
              <td>{cliente.Email}</td>
              <td>
                <button onClick={() => editarCliente(cliente.ID_Cliente)}>Editar</button>
                <button onClick={() => excluirCliente(cliente.ID_Cliente)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/cadastro-cliente')}>Novo Cliente</button>
      <button onClick={() => navigate('/home')}>Home</button>
    </div>
  );
};

export default ListaClientes;
