const Sequelize = require('sequelize');
const db = require('../database/db');
const Model = require('../models/model');

const TypeEquipment = db.define('type_equipment', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }, 
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    modelId: {
        type: Sequelize.INTEGER,
        references: {
            model: Model,
            key: 'id',
        },
    },
}, {
    tableName: 'type_equipment',
});

Model.hasMany(TypeEquipment, {foreignKey: 'modelId',  as: 'types'});
TypeEquipment.belongsTo(Model, {foreignKey: 'modelId', as: 'models'});

//Criar a tabela
//TypeEquipment.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
//TypeEquipment.sync({alter: true, force:true});

module.exports = TypeEquipment;