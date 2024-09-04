// src/components/VendaForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../css/lista.css';

const VendaForm = () => {
  const [idCliente, setIdCliente] = useState('');
  const [idCarro, setIdCarro] = useState('');
  const [idUsuario, setIdUsuario] = useState('');
  const [dataVenda, setDataVenda] = useState('');
  const [valorVenda, setValorVenda] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Editar venda existente
      fetch(`http://localhost:3002/vendas/${id}`)
        .then(response => response.json())
        .then(venda => {
          setIdCliente(venda.ID_Cliente);
          setIdCarro(venda.ID_Carro);
          setIdUsuario(venda.ID_Usuario);
          setDataVenda(venda.DataVenda);
          setValorVenda(venda.ValorVenda);
        })
        .catch(error => console.error('Erro ao carregar venda:', error));
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const vendaData = {
      ID_Cliente: idCliente,
      ID_Carro: idCarro,
      ID_Usuario: idUsuario,
      DataVenda: dataVenda,
      ValorVenda: valorVenda,
    };

    const url = id
      ? `http://localhost:3002/vendas/${id}`
      : 'http://localhost:3002/vendas';

    const method = id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vendaData),
      });

      if (response.ok) {
        alert(id ? 'Venda atualizada com sucesso' : 'Venda criada com sucesso');
        navigate('/lista-vendas');
      } else {
        const errorMessage = await response.text();
        throw new Error(`Erro ao salvar venda: ${errorMessage}`);
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao processar a venda. Consulte o console para obter mais informações.');
    }
  };

  return (
    <div>
      <h1>Cadastro/Edição de Venda</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id_cliente">ID do Cliente:</label>
        <input
          type="text"
          id="id_cliente"
          name="id_cliente"
          value={idCliente}
          onChange={(e) => setIdCliente(e.target.value)}
          required
        />

        <label htmlFor="id_carro">ID do Carro:</label>
        <input
          type="text"
          id="id_carro"
          name="id_carro"
          value={idCarro}
          onChange={(e) => setIdCarro(e.target.value)}
          required
        />

        <label htmlFor="id_usuario">ID do Usuário:</label>
        <input
          type="text"
          id="id_usuario"
          name="id_usuario"
          value={idUsuario}
          onChange={(e) => setIdUsuario(e.target.value)}
          required
        />

        <label htmlFor="data_venda">Data da Venda:</label>
        <input
          type="date"
          id="data_venda"
          name="data_venda"
          value={dataVenda}
          onChange={(e) => setDataVenda(e.target.value)}
          required
        />

        <label htmlFor="valor_venda">Valor da Venda:</label>
        <input
          type="text"
          id="valor_venda"
          name="valor_venda"
          value={valorVenda}
          onChange={(e) => setValorVenda(e.target.value)}
          required
        />

        <button type="submit">Salvar</button>
      </form>

      <button onClick={() => navigate('/lista-vendas')}>Voltar para a Lista</button>
      <button onClick={() => navigate('/home')}>Home</button>
    </div>
  );
};

export default VendaForm;
