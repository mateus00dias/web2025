import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../css/lista.css';

const ClienteForm = () => {
  const [nome, setNome] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  // Função para buscar cliente pelo ID se for edição
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3002/clientes/${id}`)
        .then((response) => response.json())
        .then((cliente) => {
          setNome(cliente.Nome);
          setCpfCnpj(cliente.CPF_CNPJ);
          setEndereco(cliente.Endereco);
          setTelefone(cliente.Telefone);
          setEmail(cliente.Email);
        })
        .catch((error) => console.error('Erro ao carregar cliente:', error));
    }
  }, [id]);

  // Função para enviar os dados do cliente
  const handleSubmit = async (event) => {
    event.preventDefault();

    const clienteData = {
      Nome: nome,
      CPF_CNPJ: cpfCnpj,
      Endereco: endereco,
      Telefone: telefone,
      Email: email,
    };

    const url = id
      ? `http://localhost:3002/clientes/${id}`
      : 'http://localhost:3002/clientes';

    const method = id ? 'PUT' : 'POST'; // Se for editar usa PUT, se for criar usa POST

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteData),
      });

      if (response.ok) {
        alert(id ? 'Cliente atualizado com sucesso' : 'Cliente criado com sucesso');
        navigate('/lista-clientes');
      } else {
        const errorMessage = await response.text();
        throw new Error(`Erro ao salvar cliente: ${errorMessage}`);
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao processar o cliente. Consulte o console para obter mais informações.');
    }
  };

  return (
    <div>
      <h1>{id ? 'Edição de Cliente' : 'Cadastro de Cliente'}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label htmlFor="cpfCnpj">CPF/CNPJ:</label>
        <input
          type="text"
          id="cpfCnpj"
          name="cpfCnpj"
          value={cpfCnpj}
          onChange={(e) => setCpfCnpj(e.target.value)}
          required
        />

        <label htmlFor="endereco">Endereço:</label>
        <input
          type="text"
          id="endereco"
          name="endereco"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          required
        />

        <label htmlFor="telefone">Telefone:</label>
        <input
          type="text"
          id="telefone"
          name="telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
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

        <button type="submit">{id ? 'Atualizar' : 'Cadastrar'}</button>
      </form>

      <button onClick={() => navigate('/lista-clientes')}>Voltar para a Lista</button>
      <button onClick={() => navigate('/home')}>Home</button>
    </div>
  );
};

export default ClienteForm;
