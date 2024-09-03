const express = require('express');
const router = express.Router();
const db = require('../database'); // Importa a configuração do banco de dados
// Rota para listar todos os carros
router.get('/', async (req, res) => {
    try {
        const [carros] = await db.query('SELECT * FROM Carros');
        res.json(carros);
    } catch (err) {
        res.status(500).send('Erro ao buscar carros: ' + err.message);
    }
});

// Rota para buscar um carro específico pelo ID
router.get('/:id', async (req, res) => {
    try {
        const [carro] = await db.query('SELECT * FROM Carros WHERE ID_Carro = ?', [req.params.id]);
        if (carro.length > 0) {
            res.json(carro[0]);
        } else {
            res.status(404).send('Carro não encontrado');
        }
    } catch (err) {
        res.status(500).send('Erro ao buscar o carro: ' + err.message);
    }
});

// Rota para criar um novo carro
router.post('/', async (req, res) => {
    try {
        const { Marca, Modelo, Ano, Preco } = req.body;
        const result = await db.query('INSERT INTO Carros (Marca, Modelo, Ano, Preco) VALUES (?, ?, ?, ?)', [Marca, Modelo, Ano, Preco]);
        res.status(201).send(`Carro criado com ID: ${result[0].insertId}`);
    } catch (err) {
        res.status(500).send('Erro ao criar carro: ' + err.message);
    }
});

// Rota para atualizar um carro
router.put('/:id', async (req, res) => {
    try {
        const { Marca, Modelo, Ano, Preco } = req.body;
        const result = await db.query('UPDATE Carros SET Marca = ?, Modelo = ?, Ano = ?, Preco = ? WHERE ID_Carro = ?', [Marca, Modelo, Ano, Preco, req.params.id]);
        if (result[0].affectedRows > 0) {
            res.send('Carro atualizado com sucesso');
        } else {
            res.status(404).send('Carro não encontrado');
        }
    } catch (err) {
        res.status(500).send('Erro ao atualizar carro: ' + err.message);
    }
});

// Rota para deletar um carro
router.delete('/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM Carros WHERE ID_Carro = ?', [req.params.id]);
        if (result[0].affectedRows > 0) {
            res.send('Carro deletado com sucesso');
        } else {
            res.status(404).send('Carro não encontrado');
        }
    } catch (err) {
        res.status(500).send('Erro ao deletar carro: ' + err.message);
    }
});

module.exports = router;
