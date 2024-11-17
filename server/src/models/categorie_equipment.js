const Sequelize = require('sequelize');
const db = require('../database/db');

const CategorieEquipment = db.define('categorie', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }, 
    categorie: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    tableName: 'categorie',
});


//Criar a tabela
//CategorieEquipment.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
//CategorieEquipment.sync({alter: true, force:true});

module.exports = CategorieEquipment;