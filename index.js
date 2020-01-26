const express = require('express');
const app = express();
const cors = require('cors');

const { config } = require('./config/index');

const petsApi = require('./routes/pets.routes.js');
const userPetsApi = require('./routes/userPet.routes.js');

const { logErrors, errorHandler } = require('./utils/middlewares/errorHandlers.js');




//Middleware de body-parser
app.use(express.json());
app.use(logErrors);
app.use(errorHandler);
app.use(cors({origin: 'http://localhost:4200'}));
 
petsApi(app);
userPetsApi(app);

//Middleware control errores


app.listen(config.port, () => console.log(`Listen http://localhost:${config.port}`));