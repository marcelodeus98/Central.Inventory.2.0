const Move = require('../models/move_equipment');
const Equipment = require('../models/equipment');
const Model = require('../models/model');
const Categorie = require('../models/categorie_equipment');
const {object, string, number} = require ('yup');
const logger = require('../services/logger');


module.exports = {
    async getAll (req, res){
        try{
            const moves = await Move.findAll({
                include: [{
                    model: Equipment,
                    as: 'equipment',
                    attributes: ['mac', 'withdrawal_status'],
                    include: [{
                        model: Model,
                        as:'model',
                        attributes: ['mark', 'model'],
                        include: [{
                            model: Categorie,
                            as: 'categorie',
                            attributes: ['categorie'],
                        }],
                    }],
                }],
            });

            logger.info('Success in searching all moves');
            res.status(200).json({moves});
        } catch(err){
            logger.error('Error in seaching moves: ' + err.message);
            return res.status(500).json({ error: 'Internal server error.'});
        };
    },
};