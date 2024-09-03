const express = require('express');
const router = express.Router();
const db = require('../database'); // Importa a configuração do banco de dados

// Rota para listar todos os clientes
router.get('/', async (req, res) => {
    try {
        const [clientes] = await db.query('SELECT * FROM Clientes');
        res.json(clientes);
    } catch (err) {
        res.status(500).send('Erro ao buscar clientes: ' + err.message);
    }
});

// Rota para buscar um cliente específico pelo ID
router.get('/:id', async (req, res) => {
    try {
        const [cliente] = await db.query('SELECT * FROM Clientes WHERE ID_Cliente = ?', [req.params.id]);
        if (cliente.length > 0) {
            res.json(cliente[0]);
        } else {
            res.status(404).send('Cliente não encontrado');
        }
    } catch (err) {
        res.status(500).send('Erro ao buscar o cliente: ' + err.message);
    }
});

// Rota para criar um novo cliente
router.post('/', async (req, res) => {
    try {
        const { Nome, CPF_CNPJ, Endereco, Telefone, Email } = req.body;
        const result = await db.query('INSERT INTO Clientes (Nome, CPF_CNPJ, Endereco, Telefone, Email) VALUES (?, ?, ?, ?, ?)', [Nome, CPF_CNPJ, Endereco, Telefone, Email]);
        res.status(201).send(`Cliente criado com ID: ${result[0].insertId}`);
    } catch (err) {
        res.status(500).send('Erro ao criar cliente: ' + err.message);
    }
});

// Rota para atualizar um cliente
router.put('/:id', async (req, res) => {
    try {
        const { Nome, CPF_CNPJ, Endereco, Telefone, Email } = req.body;
        const result = await db.query('UPDATE Clientes SET Nome = ?, CPF_CNPJ = ?, Endereco = ?, Telefone = ?, Email = ? WHERE ID_Cliente = ?', [Nome, CPF_CNPJ, Endereco, Telefone, Email, req.params.id]);
        if (result[0].affectedRows > 0) {
            res.send('Cliente atualizado com sucesso');
        } else {
            res.status(404).send('Cliente não encontrado');
        }
    } catch (err) {
        res.status(500).send('Erro ao atualizar cliente: ' + err.message);
    }
});

// Rota para deletar um cliente
router.delete('/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM Clientes WHERE ID_Cliente = ?', [req.params.id]);



        if (result[0].affectedRows > 0) {
            res.send('Cliente deletado com sucesso');
        } else {
            res.status(404).send('Cliente não encontrado');
        }
    } catch (err) {
        console.error('Erro ao deletar cliente:', err);
        res.status(500).send('Erro ao deletar cliente: ' + err.message);
    }
});

module.exports = router;
