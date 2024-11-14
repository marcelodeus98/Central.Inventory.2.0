const Sequelize = require('sequelize');
const db = require('../database/db');
const Model = require('../models/model');

const Equipment = db.define('equipments',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    mac: {
        type: Sequelize.STRING,
        unique: true,
    },
    withdrawal_status:{
        type: Sequelize.STRING,
    },
    usage_status: {
        type: Sequelize.STRING,
    },
    observation:{
        type: Sequelize.STRING,
    },
    ModelId:{
        type: Sequelize.INTEGER,
        model: Model,
        key: 'id',
    },
},
{
    tableName: 'equipments',
    timestamps: true //
});

Model.hasMany(Equipment, {foreignKey: 'ModelId', as: 'equipments'});
Equipment.belongsTo(Model, {foreignKey: 'ModelId', as: 'modelEquipment'});

//Criar a tabela
//Equipment.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
//SpecifcEquipment.sync({alter: true, force:true});

module.exports = Equipment;
