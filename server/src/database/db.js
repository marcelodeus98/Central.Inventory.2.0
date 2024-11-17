const {Sequelize} = require('sequelize');
require('dotenv').config();

// database_name, user , password
const sequelize = new Sequelize('inventory', process.env.USER_DB , process.env.PASSWORD_DB, {
    host: 'localhost',
    port:3306,
    dialect: 'mysql'
});

// Verificando conexão  com o banco
sequelize.authenticate().then(() => {
    console.log('Conexão realizada com sucesso!')
}).catch(() => {
    console.log('Error: conexão falhou!')
});

module.exports = sequelize;


