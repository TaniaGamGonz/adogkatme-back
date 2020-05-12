const express = require('express');
const app = express();
const cors = require('cors');
const { config } = require('./config/index');

const userApi = require('./routes/user.routes');
const authApi = require('./routes/auth');
const petsApi = require('./routes/pets.routes.js');
const userPetsApi = require('./routes/userPet.routes.js');
const session = require('express-session');



const { logErrors, errorHandler } = require('./utils/middlewares/errorHandlers.js');


//Middleware de body-parser
app.use(express.json());

//Middleware control errores
app.use(logErrors);
app.use(errorHandler);
app.use(cors({origin: 'http://localhost:4200'}));


app.use(session({
    resave: false,
    saveUninitialized: false, 
    secret: "galletitas de avena"
    })
);
 

//Prueba cookies
app.get('/', (req, res) => {
    req.session.count = req.session.count ? req.session.count + 1 : 1;
    res.status(200).json({ esto: 'funciona', counter: req.session.count })
})
 
authApi(app);
petsApi(app);
userApi(app);
userPetsApi(app);


app.listen(config.port, () => console.log(`Listen http://localhost:${config.port}`));