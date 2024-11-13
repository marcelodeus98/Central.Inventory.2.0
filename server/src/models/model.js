const Sequelize = require('sequelize');
const db = require('../database/db');

const Model = db.define('models', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false, // not defind false
        primaryKey: true
    },
    mark: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    tableName: 'models',
});

//Criar a tabela
//Model.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
//Model.sync({alter: true, force:true});

module.exports = Model;