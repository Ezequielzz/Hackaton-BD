const express = require('express');
const app = express();
const port = 3000; // Ou a porta que você preferir
const bodyParser = require('body-parser');

const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'SiteCulinaria',
    password: 'postgres',
    port: 5432, // Porta padrão do PostgreSQL
});

const usuariosModel = require('./Model/usuarios');

// Exemplo de consulta
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
    } else {
        console.log('Conectado ao banco de dados em:', res.rows[0].now);
    }
});

// Configuração para aceitar dados em formato JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// Endpoint para receber os dados do formulário e inserir no banco de dados
app.post('/cadastro', async (req, res) => {
    const { nome, email, senha, dataNascimento, telefone, endereco } = req.body;

    console.log(req.body); // Adicione esta linha para verificar os dados recebidos

    try {
        const values = [nome, email, senha, dataNascimento, telefone, endereco];

        await usuariosModel.cadastrarUsuario(values);
        res.redirect('http://127.0.0.1:5500/View/index.html');
    } catch (err) {
        console.error('Erro ao cadastrar usuário:', err);
        res.status(500).send('Erro ao cadastrar usuário.');
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

// Encerrar o pool de conexão com o banco de dados ao encerrar o servidor
process.on('SIGINT', () => {
    console.log('Encerrando o servidor e o pool de conexão com o banco de dados.');
    pool.end();
});
