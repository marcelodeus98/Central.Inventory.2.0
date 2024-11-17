const Model = require('../models/model');
const Categorie = require('../models/categorie_equipment');
const {object, string, number} = require ('yup');
const logger = require('../services/logger');

module.exports = {
        async create(req, res){
            const schema = object().shape({
                mark: string().required('You muster enter the brand'),
                model: string().required('You need to enter the model'), 
                categorieId: number().required('You need to enter the categorie')
            });
    
            try{
                await schema.validate(req.body, {abortEarly: false});
                
                const existingModel = await Model.findOne({
                    where: {model: req.body.model}
                });
    
                if(existingModel){
                    logger.warn('Model already registered.');
                    return res.status(409).json({ error: 'Model already registered.'});
                };
    
                const {mark, model, categorieId} = req.body;
                const newModel = await Model.create({mark, model, categorieId});
                
                logger.info('Sucessfull register Model');
                return res.status(201).json({mark, model, categorieId});
    
            } catch(err){
                if(err.name === 'ValidationError'){
                    const errors = err.inner.map(error => error.message);
                    logger.warn(errors.join(', '));
                    return res.status(400).json({errors});
                };

                logger.error('Error when saving data: ' + err.message);
                return res.status(500).json({ error: 'Internal server error.'});
            };
        },
        
        async getAll(req, res){
            try{
                const models = await Model.findAll({
                    include: [{
                        model: Categorie,
                        as: 'categorie',
                        attributes: ['categorie']
                    }],
                });
                logger.info('Success in searching all models');
                res.status(200).json({models});
            } catch(err){
                logger.error('Error in seaching models: ' + err.message);
                return res.status(500).json({ error: 'Internal server error.'});
            };
        },

        async getById(req, res){
            try{
                const id = req.params.id;
                const model = await Model.findByPk(id, {
                    include: [{
                        model: Categorie,
                        as: 'categorie',
                        attributes: ['categorie']
                    }],
                });

                if(!model){
                    logger.error('Error in seaching models: ' + err.message);
                    return res.status(404).json({ message: 'Model not found.'});
                };

                logger.info('Success in searching model');
                res.status(200).json({model});
            } catch(err){
                logger.error('Error in seaching model: ' + err.message);
                return res.status(500).json({ error: 'Internal server error.'});
            };
        },

        async alter(req, res){
            const schema = object().shape({
                mark: string().required('You muster enter the brand'),
                model: string().required('You need to enter the model')
            });

            try{
                await schema.validate(req.body, {abortEarly: false});
                
                const id = req.params.id;
                const {mark, model} = req.body;

                const modelToAlter = await Model.findByPk(id);

                if(!modelToAlter){
                    logger.warn('Unable to update, mark/model does not exist');
                    return res.status(404).json({ error: 'Unable to update, mark/model does not exist'});
                };

                modelToAlter.mark = mark;
                modelToAlter.model = model;

                const isSave = await modelToAlter.save();
                
                logger.info('Model updated sucessfully.');
                return res.status(200).json({modelToAlter});

            } catch(err){
                logger.error('Error when saving data: ' + err.message);
                return res.status(500).json({ error: 'Internal server error.'});
            };
        },

        async delete(req, res){
            const id = req.params.id;

            try{
                if(!id){
                    logger.warn('Cannot delete, the mark/model does not exist.');
                    return res.status(401).json({ error: 'Cannot delete, the mark/model does not exist.'});
                };

                Model.destroy({where: {id}});

                logger.info('Model deletd.');
                return res.status(200).json({msg: 'Model deleted.'});

            } catch(err){
                logger.error('Error when delete data: '+ err.message);
                return res.status(500).json({ error: 'Internal server error.'});
            }
        },
};
