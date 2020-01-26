
//Almacenamiento en cookies, debería introducirse en index.js 

const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "keyboard cat"  //define que cuando la cookie es segura, se va a cifrar en base a este secret
}))

app.get('/', (req, res) => {
    req.session.count = req.session.count ? req.session.count + 1 : 1;
    res.status(200).json({ hola : 'mundo', counter : req.session.count});
});


app.listen(3000, ()=>{
    console.log('En el puerto 3000');
})