const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors'); // Importe o pacote cors

// Configuração do body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Permita solicitações CORS de todas as origens

// Importação das rotas
const clienteRoutes = require('./routes/cliente');
const usuarioRoutes = require('./routes/usuario');
const veiculoRoutes = require('./routes/veiculo');
const vendaRoutes = require('./routes/venda');

// Definição das rotas
app.use('/clientes', clienteRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/veiculos', veiculoRoutes);
app.use('/vendas', vendaRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
