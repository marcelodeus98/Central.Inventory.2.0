const {Equipment, MoveEquipment }= require('../models/index');
const Categorie = require('../models/categorie_equipment');
const Model = require('../models/model');
const {object, string, number} = require ('yup');
const logger = require('../services/logger');

module.exports = {
    async create(req, res){
        const schema = object().shape({
            mac: string().required('MAC serial is required'),
            withdrawal_status: string().required('Withdrawal status is required')
        });

        try{
            await schema.validate(req.body, {abortEarly: false});

            const existingEquipment = await Equipment.findOne({
                where: {mac: req.body.mac}
            });

            if(existingEquipment){
                logger.warn('Equipement already registered.');
                return res.status(409).json({ error: 'Equipment already registered.'});
            };

            const{ mac, withdrawal_status } = req.body;
            const newEquipment = await Equipment.create({mac, withdrawal_status});
            
            logger.info('Sucessfull register Equipment');
            return res.status(201).json({newEquipment});
        } catch(error){
            if(err.name === 'ValidationError'){
                const errors = err.inner.map(error => error.message);
                logger.warn(errors.join(', '));
                return res.status(400).json({errors});
            };

            logger.error('Error when saving data: ' + err.message);
            return res.status(500).json({ error: 'Internal server error.'});
        };
    },

    async getAll (req, res){
        try{
            const equipments = await Equipment.findAll({
                include:[
                    {
                        model: Model,
                        as: 'modelEquipment',
                        attributes: ['mark', 'model'],
                        include: [
                            {
                                model: Categorie,
                                as: 'models',
                                attributes: ['']
                            }
                        ]
                    } 
                ]
            });
            logger.info('Success in searching all equipments');
            res.status(200).json({equipments});
        } catch(err){
            logger.error('Error in seaching equipments: ' + err.message);
            return res.status(500).json({ error: 'Internal server error.'});
        };
    },

    async getById(req, res){
        try{
            const id = req.params.id;
            const equipment = await categorie.findByPk(id);

            if(!equipment){
                logger.error('Error in seaching equipment: ' + err.message);
                return res.status(404).json({ message: 'equipment not found.'});
            };

            logger.info('Success in searching equipment');
            res.status(200).json({equipment});
        } catch(err){
            logger.error('Error in seaching equipment: ' + err.message);
            return res.status(500).json({ error: 'Internal server error.'});
        };
    },
    
    async alter (req, res){
        const schema = object().shape({
            usage_status: string().required('Usage status is required'),
            observation: string().required('Observation is required'),
        });

        try{
            await schema.validate(req.body, {abortEarly: false});

            const id = req.params.id;
            const {usage_status, observation} = req.body;

            const equipmentToAlter = await Equipment.findByPk(id);

            if(!equipmentToAlter){
                logger.warn('Unable to update, categorie does not exist');
                return res.status(404).json({ error: 'Unable to update, categorie does not exist'});
            }

            equipmentToAlter.usage_status = usage_status;
            equipmentToAlter.observation = observation;
            
            await equipmentToAlter.save();

            await MoveEquipment.create({
                equipmentId: id,
                usage_status,
                observation,
                date_movement: new Date(),
            });

            logger.info('Equipment updated and movement registered');
            return res.status(200).json(equipmentToAlter);

        } catch(err){
            logger.error('Error when saving data: ' + err.message);
            return res.status(500).json({ error: 'Internal server error.'});
        }
    },

    async delete (req, res){
        const {id} = req.params;
        
        try{
            if(!id){
                logger.warn('Cannot delete, the equipment does not exist.');
                return res.status(401).json({ error: 'Cannot delete, the equipment does not exist.'});
            };
           
            await Equipment.destroy({where: {id}});

            logger.info('Equipment deleted.');
            return res.status(200).json({msg: 'Equipment deleted.'});
        }
        catch(err){
            logger.error('Error when delete data: '+ err.message);
            return res.status(500).json({ error: 'Internal server error.'});
        };
    },
};