const Sequelize = require('sequelize');
const db = require('../database');
const Equipment = require('../models/equipment');

const MoveEquipment = db.define('move_equipment' ,{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    equipmentId:{
        type: Sequelize.INTEGER,
        references: {
            model: Equipment,
            key: 'id',
        },
        allowNull: false,
    },
    usage_status: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    observation:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    date_movement:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
}, {
    tableName: 'move_equipment',
    timestamps: true //
});

Equipment.hasMany(MoveEquipment, {foreignKey: 'equipmentId', as: 'moves'});
MoveEquipment.belongsTo(Equipment, {foreignKey: 'equipmentId', as: 'equipment'});

//Criar a tabela
//MoveEquipment.sync();
//Verificar se há alguma diferença na tabela, realiza a alteração
//MoveEquipment.sync({alter: true, force:true});

module.exports = MoveEquipment;