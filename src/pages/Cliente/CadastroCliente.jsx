import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/cadastro.css';

const CadastroCliente = () => {
  const [cliente, setCliente] = useState({
    nome: '',
    cpfCnpj: '',
    endereco: '',
    telefone: '',
    email: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const clienteId = new URLSearchParams(window.location.search).get('id');
    const url = clienteId
      ? `http://localhost:3002/clientes/${clienteId}`
      : 'http://localhost:3002/clientes';
    const method = clienteId ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    })
      .then(() => {
        alert(`Cliente ${clienteId ? 'atualizado' : 'criado'} com sucesso`);
        navigate('/lista-clientes');
      })
      .catch((error) => console.error('Erro ao salvar cliente:', error));
  };

  return (
    <div>
      <h1>Cadastro/Edição de Cliente</h1>
      <form onSubmit={handleSubmit} id="cliente-form">
        <label htmlFor="nome">Nome:</label>
        <input type="text" id="nome" name="nome" value={cliente.nome} onChange={handleChange} required />

        <label htmlFor="cpf_cnpj">CPF/CNPJ:</label>
        <input type="text" id="cpf_cnpj" name="cpfCnpj" value={cliente.cpfCnpj} onChange={handleChange} required />

        <label htmlFor="endereco">Endereço:</label>
        <input type="text" id="endereco" name="endereco" value={cliente.endereco} onChange={handleChange} />

        <label htmlFor="telefone">Telefone:</label>
        <input type="text" id="telefone" name="telefone" value={cliente.telefone} onChange={handleChange} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={cliente.email} onChange={handleChange} />

        <button type="submit">Salvar</button>
      </form>

      <button onClick={() => navigate('/lista-clientes')}>Voltar para a Lista</button>
      <button onClick={() => navigate('/home')}>Home</button>
    </div>
  );
};

export default CadastroCliente;
