const Equipment = require('./equipment');
const MoveEquipment = require('./move_equipment');

Equipment.hasMany(MoveEquipment, { foreignKey: 'equipmentId', as: 'moves' });
MoveEquipment.belongsTo(Equipment, { foreignKey: 'equipmentId', as: 'equipment' });

module.exports = {
    Equipment,
    MoveEquipment,
};