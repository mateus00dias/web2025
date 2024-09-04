// src/components/ListaVendas.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/cadastro.css';

const ListaVendas = () => {
  const [vendas, setVendas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarVendas = async () => {
      try {
        const response = await fetch('http://localhost:3002/vendas');
        const data = await response.json();
        setVendas(data);
      } catch (error) {
        console.error('Erro ao carregar vendas:', error);
      }
    };

    carregarVendas();
  }, []);

  const editarVenda = (id) => {
    navigate(`/cadastro-venda/${id}`);
  };

  const excluirVenda = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/vendas/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Venda excluída com sucesso');
        setVendas(vendas.filter(venda => venda.ID_Venda !== id));
      } else {
        const errorMessage = await response.text();
        throw new Error(`Erro ao excluir venda: ${errorMessage}`);
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir venda. Consulte o console para obter mais informações.');
    }
  };

  return (
    <div>
      <h1>Listagem de Vendas</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID do Cliente</th>
            <th>ID do Carro</th>
            <th>ID do Usuário</th>
            <th>Data da Venda</th>
            <th>Valor da Venda</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map(venda => (
            <tr key={venda.ID_Venda}>
              <td>{venda.ID_Venda}</td>
              <td>{venda.ID_Cliente}</td>
              <td>{venda.ID_Carro}</td>
              <td>{venda.ID_Usuario}</td>
              <td>{venda.DataVenda}</td>
              <td>{venda.ValorVenda}</td>
              <td>
                <button onClick={() => editarVenda(venda.ID_Venda)}>Editar</button>
                <button onClick={() => excluirVenda(venda.ID_Venda)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/cadastro-venda')}>Nova Venda</button>
      <button onClick={() => navigate('/home')}>Home</button>
    </div>
  );
};

export default ListaVendas;
