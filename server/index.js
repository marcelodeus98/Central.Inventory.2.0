const express = require('express');
const routes = require('./src/routes');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const port = process.env.PORT || 8077;

const app = express();

app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());

app.use(routes);

app.listen(port, () => {
    console.log(`Port ${port} is running!`);
})