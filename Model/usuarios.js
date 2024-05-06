// models/usuarios.js

const { Pool } = require('pg');

// Configuração do pool de conexão com o banco de dados
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'SiteCulinaria',
    password: 'postgres',
    port: 5432, // Porta padrão do PostgreSQL
});

// Função para inserir um novo usuário no banco de dados
async function cadastrarUsuario(values) {
    const query = `
        INSERT INTO usuarios (nome, email, senha, data_nascimento, telefone, endereco)
        VALUES ($1, $2, $3, $4, $5, $6)
    `;

    try {
        const result = await pool.query(query, values);
        console.log('Usuário cadastrado com sucesso!');
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao cadastrar usuário:', err.stack);
        throw err;
    }
}

module.exports = {
    cadastrarUsuario,
    // Outras funções relacionadas aos usuários, como consultar, atualizar e excluir
};
