const swaggerUi = require('swagger-ui-express');
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });


// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Central.Iventory',
        version: '1.0.0',
        description: 'Sistema de controle de estoque',
    },
    servers: [{
        url: 'http://localhost:8077', // Replace with your server URL
        description: 'Development server',
    }],
 };

 const outputFile = './swagger-output.json';
 const endpointsFiles = ['./src/routes'];

// Initialize swagger-jsdoc
swaggerAutogen(outputFile, endpointsFiles, swaggerDefinition).then(() => {
    require('./index');
});