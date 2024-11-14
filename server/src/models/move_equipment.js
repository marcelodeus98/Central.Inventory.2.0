const Sequelize = require('sequelize');
const db = require('../database/db');
const Equipment = require('../models/equipment');

const MoveEquipment = db.define('move_equipment', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    equipmentId: {
        type: Sequelize.INTEGER,
        references: {
            model: Equipment,
            key: 'id',
        },
        allowNull: false,
    },
    usage_status: {
        type: Sequelize.STRING,
        allowNull: false, // Status de uso durante o movimento
    },
    observation: {
        type: Sequelize.STRING,
        allowNull: false, // Observações sobre o movimento
    },
    date_movement: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, // Data do movimento
    },
}, {
    tableName: 'move_equipment',
});

// Relacionamentos
Equipment.hasMany(MoveEquipment, { foreignKey: 'equipmentId', as: 'moves' });
MoveEquipment.belongsTo(Equipment, { foreignKey: 'equipmentId', as: 'equipment' });

//MoveEquipment.sync();

module.exports = MoveEquipment;