const express = require('express');
const router = express.Router();
const db = require('../database'); // Importa a configuração do banco de dados
// Rota para listar todos os usuários
router.get('/', async (req, res) => {
    try {
        const [usuarios] = await db.query('SELECT * FROM Usuarios');
        res.json(usuarios);
    } catch (err) {
        res.status(500).send('Erro ao buscar usuários: ' + err.message);
    }
});

// Rota para buscar um usuário específico pelo ID
router.get('/:id', async (req, res) => {
    try {
        const [usuario] = await db.query('SELECT * FROM Usuarios WHERE ID_Usuario = ?', [req.params.id]);
        if (usuario.length > 0) {
            res.json(usuario[0]);
        } else {
            res.status(404).send('Usuário não encontrado');
        }
    } catch (err) {
        res.status(500).send('Erro ao buscar o usuário: ' + err.message);
    }
});

// Rota para criar um novo usuário
router.post('/', async (req, res) => {
    try {
        const { NomeUsuario, Senha, Email, Role } = req.body;
        const result = await db.query('INSERT INTO Usuarios (NomeUsuario, Senha, Email, Role) VALUES (?, ?, ?, ?)', [NomeUsuario, Senha, Email, Role]);
        res.status(201).send(`Usuário criado com ID: ${result[0].insertId}`);
    } catch (err) {
        res.status(500).send('Erro ao criar usuário: ' + err.message);
    }
});

// Rota para atualizar um usuário
router.put('/:id', async (req, res) => {
    try {
        const { NomeUsuario, Senha, Email, Role } = req.body;
        const result = await db.query('UPDATE Usuarios SET NomeUsuario = ?, Senha = ?, Email = ?, Role = ? WHERE ID_Usuario = ?', [NomeUsuario, Senha, Email, Role, req.params.id]);
        if (result[0].affectedRows > 0) {
            res.send('Usuário atualizado com sucesso');
        } else {
            res.status(404).send('Usuário não encontrado');
        }
    } catch (err) {
        res.status(500).send('Erro ao atualizar usuário: ' + err.message);
    }
});

// Rota para deletar um usuário
router.delete('/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM Usuarios WHERE ID_Usuario = ?', [req.params.id]);
        if (result[0].affectedRows > 0) {
            res.send('Usuário deletado com sucesso');
        } else {
            res.status(404).send('Usuário não encontrado');
        }
    } catch (err) {
        res.status(500).send('Erro ao deletar usuário: ' + err.message);
    }
});

// Rota para realizar o login
router.post('/login', async (req, res) => {
    try {
        const { NomeUsuario, Senha } = req.body;
        const [usuario] = await db.query('SELECT * FROM Usuarios WHERE NomeUsuario = ? AND Senha = ?', [NomeUsuario, Senha]);

        if (usuario.length > 0) {
            res.status(200).json({ message: 'Login bem-sucedido' });
        } else {
            res.status(401).json({ message: 'Nome de usuário ou senha inválidos' });
        }
    } catch (err) {
        res.status(500).send('Erro ao realizar o login: ' + err.message);
    }
});

module.exports = router;
