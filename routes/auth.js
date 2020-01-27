const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const ApiKeyService = require('../services/apiKeys.service');
const { config } = require('../config');

//Basic strategy

require('../utils/auth/basic.js');

function authApi(app){
    const router = express.Router();
    app.use('/api/auth', router)

    const apiKeyService = new ApiKeyService();

    router.post('/sign-in', async function(req, res, next) {
        const { apiKeyToken } = req.body;
        if(!apiKeyToken){
            next(boom.unauthorized('apiKeyToken es requerido'));
        }
        passport.authenticate('basic', function(error, user){
            try{
                if(error || !user){
                    next(boom.unauthorized());
                }

                req.login(user, {session: false }, async function(error){
                    if(error){
                        next(error);
                    }

                    const apiKey = await apiKeyService.getApiKey( { token: apiKeyToken } );
                    if(!apiKey){
                        next(boom.unauthorized());

                    }
                    const{ _id: id, name, email } = user;

                    
                    const payload = {
                        sub: id,
                        name, 
                        email,
                        scopes: apiKey.scopes
                    }

                    const token = jwt.sign(payload, config.atuhJwtSecret, {
                        expiresIn: '15m'
                    });
                    return res.status(200).json({ token, user: {id, name, email}})
                })

            }catch(error){
                next(error);
            }
        })(req, res, next);
    })
}

module.exports = authApi;