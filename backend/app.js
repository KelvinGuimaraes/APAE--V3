const express = require('express');
const session = require('express-session');
const database = require('./src/config/database');
const config = require('./src/config/config');
const apiRoutes = require('./src/routes');

const app = express();

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessões simples
app.use(session(config.session));

// Rotas da API
app.use('/api', apiRoutes);

// Inicializar servidor
const startServer = async () => {
    try {
        // Conectar ao banco de dados
        await database.connect();
        
        // Iniciar servidor
        app.listen(config.server.port, () => {
            console.log('=================================');
            console.log('🚀 Servidor Backend APAE V3');
            console.log(`📡 API rodando na porta ${config.server.port}`);
            console.log('=================================');
        });
        
    } catch (error) {
        console.error('❌ Erro ao iniciar servidor:', error);
        process.exit(1);
    }
};

// Fechar conexão ao encerrar
process.on('SIGINT', async () => {
    console.log('\n🔄 Encerrando servidor...');
    try {
        await database.close();
        process.exit(0);
    } catch (error) {
        console.error('Erro ao encerrar:', error);
        process.exit(1);
    }
});

// Iniciar aplicação
startServer();