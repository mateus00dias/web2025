const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../database'); // Database configuration import
require('dotenv').config();

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
    const { NomeUsuario, Senha, Email, Role } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(Senha, salt);
    try {
        const result = await db.query('INSERT INTO Usuarios (NomeUsuario, Senha, Email, Role) VALUES (?, ?, ?, ?)', [NomeUsuario, hashedPassword, Email, Role]);
        res.status(201).send(`Usuário criado com ID: ${result[0].insertId}`);
    } catch (err) {
        res.status(500).send('Erro ao criar usuário: ' + err.message);
    }
});


// Rota para atualizar um usuário
router.put('/:id', async (req, res) => {
    try {
        const { NomeUsuario, Senha, Email } = req.body;
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
        
        const [usuario] = await db.query('SELECT * FROM Usuarios WHERE NomeUsuario = ?', [NomeUsuario]);
        bcrypt.compare(Senha, usuario[0].Senha, (err, isMatch) => {
            if (err) {
                return res.status(500).send('Server error');
            }
            if (isMatch) {
                const token = jwt.sign({ id: usuario[0].ID_Usuario, email: usuario[0].Email }, process.env.JWT_SECRET, {
                    expiresIn: '10d',
                });
                return res.status(200).json({ token, message: 'Login bem-sucedido' });
            } else {
                return res.status(401).json({ message: 'Nome de usuário ou senha inválidos' });
            }
        });

    } catch (err) {
        res.status(500).send('Erro ao realizar o login: ' + err.message);
    }
});

module.exports = router;
