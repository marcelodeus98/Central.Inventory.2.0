const Sequelize = require('sequelize');
const db = require('../database/db');
const Categorie = require('./categorie_equipment');

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
    categorieId: {
        type: Sequelize.INTEGER,
        references: {
            model: Categorie,
            key: 'id',
        },
    },
}, {
    tableName: 'models',
});

Model.hasMany(Categorie, {foreignKey: 'categorieId',  as: 'categories'});
Categorie.belongsTo(Model, {foreignKey: 'categorieId', as: 'models'});

//Criar a tabela
//Model.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
Model.sync({alter: true, force:true});

module.exports = Model;