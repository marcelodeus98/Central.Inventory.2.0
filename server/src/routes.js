const { Router } = require('express');
const routes = Router();

const ModelController = require('./controllers/modelController');

//Rotas públicas
//routes.post('/login', sessionController.login);

//Rotas privadas
routes.get('/models', ModelController.getAll);
routes.get('/model/:id', ModelController.getById);

routes.post('/register/model', ModelController.create);

routes.put('/model/alter/:id', ModelController.alter);

routes.delete('/model/delete/:id', ModelController.delete);

module.exports = routes;