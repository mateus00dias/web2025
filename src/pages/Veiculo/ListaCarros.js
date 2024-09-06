// src/components/ListaCarros.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListaCarros = () => {
  const [carros, setCarros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3002/veiculos')
      .then(response => response.json())
      .then(data => setCarros(data))
      .catch(error => console.error('Erro ao carregar carros:', error));
  }, []);

  const editarCarro = (id) => {
    navigate(`/cadastro-carro/${id}`);
  };

  const excluirCarro = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/veiculos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Carro excluído com sucesso');
        setCarros(carros.filter(carro => carro.ID_Carro !== id));
      } else {
        const errorMessage = await response.text();
        throw new Error(`Erro ao excluir carro: ${errorMessage}`);
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir carro. Consulte o console para obter mais informações.');
    }
  };

  return (
    <div>
      <h1>Listagem de Carros</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ano</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {carros.map(carro => (
            <tr key={carro.ID_Carro}>
              <td>{carro.ID_Carro}</td>
              <td>{carro.Marca}</td>
              <td>{carro.Modelo}</td>
              <td>{carro.Ano}</td>
              <td>{carro.Preco}</td>
              <td>
                <button onClick={() => editarCarro(carro.ID_Carro)}>Editar</button>
                <button onClick={() => excluirCarro(carro.ID_Carro)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/cadastro-carro')}>Novo Carro</button>
      <button onClick={() => navigate('/home')}>Home</button>
    </div>
  );
};

export default ListaCarros;
