const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
    resave: false,
    saveUninitialized: false, 
    secret: "galletitas de avena"
    })
);

app.get('/', (req, res) => {
    req.session.count = req.session.count ? req.session.count + 1 : 1;
    res.status(200).json({ esto: 'funciona', counter: req.session.count })
})