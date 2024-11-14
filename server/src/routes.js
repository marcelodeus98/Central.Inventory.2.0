const { Router } = require('express');
const routes = Router();

const CategorieController = require('./controllers/categorieEquipmentController');
const EquipmentController = require('./controllers/equipmentController');
const ModelController = require('./controllers/modelController');
const MoveController = require('./controllers/moveEquipmentController');


//Rotas públicas
//routes.post('/login', sessionController.login);

//Rotas privadas
routes.get('/categories', CategorieController.getAll);
routes.get('/categorie/:id', CategorieController.getById);
routes.get('/equipments', EquipmentController.getAll);
routes.get('/equipment/:id', EquipmentController.getById);
routes.get('/models', ModelController.getAll);
routes.get('/model/:id', ModelController.getById);
routes.get('/moves', MoveController.getAll);

routes.post('/register/categorie', CategorieController.create);
routes.post('/register/model', ModelController.create);
routes.post('/register/equipment', EquipmentController.create);

routes.put('/alter/categorie/:id', CategorieController.alter);
routes.put('/alter/model/:id', ModelController.alter);
routes.put('/alter/equipment/:id', EquipmentController.alter);

routes.delete('/delete/categorie/:id', CategorieController.delete);
routes.delete('/delete/model/:id', ModelController.delete);
routes.delete('/delete/equipment/:id', EquipmentController.delete); 

module.exports = routes;