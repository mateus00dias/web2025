// src/components/CarroForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../css/cadastro.css';

const CarroForm = () => {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [preco, setPreco] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Editar carro existente
      fetch(`http://localhost:3002/veiculos/${id}`)
        .then(response => response.json())
        .then(carro => {
          setMarca(carro.Marca);
          setModelo(carro.Modelo);
          setAno(carro.Ano);
          setPreco(carro.Preco);
        })
        .catch(error => console.error('Erro ao carregar carro:', error));
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const carroData = { Marca: marca, Modelo: modelo, Ano: ano, Preco: preco };

    const url = id
      ? `http://localhost:3000/veiculos/${id}`
      : 'http://localhost:3000/veiculos';

    const method = id ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carroData),
    })
      .then(() => {
        alert(id ? 'Veículo atualizado com sucesso' : 'Veículo criado com sucesso');
        navigate('/lista-carros');
      })
      .catch(error => console.error('Erro ao salvar veículo:', error));
  };

  return (
    <div>
      <h1>Cadastro/Edição de Carro</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="marca">Marca:</label>
        <input
          type="text"
          id="marca"
          name="marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          required
        />

        <label htmlFor="modelo">Modelo:</label>
        <input
          type="text"
          id="modelo"
          name="modelo"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          required
        />

        <label htmlFor="ano">Ano:</label>
        <input
          type="text"
          id="ano"
          name="ano"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          required
        />

        <label htmlFor="preco">Preço:</label>
        <input
          type="text"
          id="preco"
          name="preco"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />

        <button type="submit">Salvar</button>
      </form>

      <button onClick={() => navigate('/lista-carros')}>Voltar para a Lista</button>
      <button onClick={() => navigate('/home')}>Home</button>
    </div>
  );
};

export default CarroForm;
