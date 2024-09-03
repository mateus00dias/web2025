const express = require('express');
const router = express.Router();
const db = require('../database'); // Importa a configuração do banco de dados
// Rota para listar todas as vendas
router.get('/', async (req, res) => {
    try {
        const [vendas] = await db.query('SELECT * FROM Vendas');
        res.json(vendas);
    } catch (err) {
        res.status(500).send('Erro ao buscar vendas: ' + err.message);
    }
});

// Rota para buscar uma venda específica pelo ID
router.get('/:id', async (req, res) => {
    try {
        const [venda] = await db.query('SELECT * FROM Vendas WHERE ID_Venda = ?', [req.params.id]);
        if (venda.length > 0) {
            res.json(venda[0]);
        } else {
            res.status(404).send('Venda não encontrada');
        }
    } catch (err) {
        res.status(500).send('Erro ao buscar a venda: ' + err.message);
    }
});

// Rota para criar uma nova venda
router.post('/', async (req, res) => {
    try {
        const { ID_Cliente, ID_Carro, ID_Usuario, DataVenda, ValorVenda } = req.body;
        const result = await db.query('INSERT INTO Vendas (ID_Cliente, ID_Carro, ID_Usuario, DataVenda, ValorVenda) VALUES (?, ?, ?, ?, ?)', [ID_Cliente, ID_Carro, ID_Usuario, DataVenda, ValorVenda]);
        res.status(201).send(`Venda criada com ID: ${result[0].insertId}`);
    } catch (err) {
        res.status(500).send('Erro ao criar venda: ' + err.message);
    }
});

// Rota para atualizar uma venda
router.put('/:id', async (req, res) => {
    try {
        const { ID_Cliente, ID_Carro, ID_Usuario, DataVenda, ValorVenda } = req.body;
        const result = await db.query('UPDATE Vendas SET ID_Cliente = ?, ID_Carro = ?, ID_Usuario = ?, DataVenda = ?, ValorVenda = ? WHERE ID_Venda = ?', [ID_Cliente, ID_Carro, ID_Usuario, DataVenda, ValorVenda, req.params.id]);
        if (result[0].affectedRows > 0) {
            res.send('Venda atualizada com sucesso');
        } else {
            res.status(404).send('Venda não encontrada');
        }
    } catch (err) {
        res.status(500).send('Erro ao atualizar venda: ' + err.message);
    }
});

// Rota para deletar uma venda
router.delete('/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM Vendas WHERE ID_Venda = ?', [req.params.id]);
        if (result[0].affectedRows > 0) {
            res.send('Venda deletada com sucesso');
        } else {
            res.status(404).send('Venda não encontrada');
        }
    } catch (err) {
        res.status(500).send('Erro ao deletar venda: ' + err.message);
    }
});

module.exports = router;
