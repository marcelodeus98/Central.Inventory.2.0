const Sequelize = require('sequelize');
const db = require('../database/db');
const TypeEquipment = require('../models/type_equipment');
const MoveEquipment = require('../models/move_equipment');

const Equipment = db.define('equipments',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    mac: {
        type: Sequelize.STRING,
        allowNull: false,
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
    typeEquipmentId:{
        type: Sequelize.INTEGER,
        model: TypeEquipment,
        key: 'id',
    },
},
{
    tableName: 'equipments',
    timestamps: true //
});

TypeEquipment.hasMany(Equipment, {foreignKey: 'typeEquipmentId', as: 'equipments'});
Equipment.belongsTo(TypeEquipment, {foreignKey: 'typeEquipmentId', as: 'typeEquipment'});
Equipment.hasMany(MoveEquipment, {foreignKey: 'equipmentId', as: 'moves'});

//Criar a tabela
//Equipment.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
//SpecifcEquipment.sync({alter: true, force:true});

module.exports = Equipment;
