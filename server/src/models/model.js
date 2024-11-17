const Sequelize = require('sequelize');
const db = require('../database/db');
const Categorie = require('./categorie_equipment');

const Model = db.define('models', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    mark: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    categorieId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'categorie', // Nome da tabela
            key: 'id',
        },
    },
}, {
    tableName: 'models',
});

// Relacionamentos
Model.belongsTo(Categorie, { foreignKey: 'categorieId', as: 'categorie' });
Categorie.hasMany(Model, { foreignKey: 'categorieId', as: 'models' });

//Criar a tabela
//Model.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
//Model.sync({alter: true, force:true});

module.exports = Model;