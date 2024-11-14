const CategorieEquipment = require('../models/categorie_equipment');
const {object, string} = require ('yup');
const logger = require('../services/logger');

module.exports = {
    async create(req, res){
        const schema = object().shape({
            categorie: string().required('Category is required')
        });

        try{
            await schema.validate(req.body, {abortEarly: false});

            const existingCategorie = await CategorieEquipment.findOne({
                where: {model: req.body.categorie}
            });

            if(existingCategorie){
                logger.warn('Categorie already registered.');
                return res.status(409).json({ error: 'Categorie already registered.'});
            };

            const categorie = req.body.categorie;
            const newCategorie = CategorieEquipment.create({categorie});
            
            logger.info('Sucessfull register Model');
            return res.status(201).json({newCategorie});
        
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
            const categories = await CategorieEquipment.findAll();
            logger.info('Success in searching all categories');
            res.status(200).json({categories});
        } catch(err){
            logger.error('Error in seaching categories: ' + err.message);
            return res.status(500).json({ error: 'Internal server error.'});
        };
    },

    async getById(req, res){
        try{
            const id = req.params.id;
            const categorie = await categorie.findByPk(id);

            if(!categorie){
                logger.error('Error in seaching categorie: ' + err.message);
                return res.status(404).json({ message: 'categorie not found.'});
            };

            logger.info('Success in searching categorie');
            res.status(200).json({categorie});
        } catch(err){
            logger.error('Error in seaching categorie: ' + err.message);
            return res.status(500).json({ error: 'Internal server error.'});
        };
    },

    async alter(req, res){
        const schema = object().shape({
            categorie: string().required('Category is required')
        });

        try{
            await schema.validate(req.body, {abortEarly: false});
            
            const id = req.params.id;
            const {categorie} = req.body;

            const categorieToAlter = await CategorieEquipment.findByPk(id);

            if(!categorieToAlter){
                logger.warn('Unable to update, categorie does not exist');
                return res.status(404).json({ error: 'Unable to update, categorie does not exist'});
            };

            categorieToAlter.categorie = categorie;

            const isSave = await categorieToAlter.save();
            
            logger.info('Categorie updated sucessfully.');
            return res.status(200).json({categorieToAlter});

        } catch(err){
            logger.error('Error when saving data: ' + err.message);
            return res.status(500).json({ error: 'Internal server error.'});
        };
    },

    async delete(req, res){
        const id = req.params.id;

        try{
            if(!id){
                logger.warn('Cannot delete, the categorie does not exist.');
                return res.status(401).json({ error: 'Cannot delete, the categorie does not exist.'});
            };

            await CategorieEquipment.destroy({where: {id}});

            logger.info('Categorie deletd.');
            return res.status(200).json({msg: 'Categorie deleted.'});

        } catch(err){
            logger.error('Error when delete data: '+ err.message);
            return res.status(500).json({ error: 'Internal server error.'});
        }
    },
}