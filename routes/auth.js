const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const validationHandler = require('../utils/middlewares/validationHandler');

const ApiKeyService = require('../services/apiKeys.service');
const UserService = require('../services/user.service');

const  { createUserSchema } = require('../utils/schemas/users.schema');
const { config } = require('../config');

//Basic strategy

require('../utils/auth/basic.js');

function authApi(app){
    const router = express.Router();
    app.use('/api/auth', router);

    const apiKeyService = new ApiKeyService();
    const userService = new UserService();

    router.post('/sign-in', async function(req, res, next) {
        const { apiKeyToken } = req.body;


        if(!apiKeyToken){
            next(boom.unauthorized('apiKeyToken es requerido'));
        }
        passport.authenticate('basic', function(error, user){

            try{
               if(error || !user){
                    next(boom.unauthorized('no hay user'));
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
                    res.cookie('sessionId', token, { expires: new Date(Date.now() + 9000000000000), httpOnly:true});
                    return res.status(200).json({ token, user: {id, name, email}})
                })

            }catch(error){
                next(error);
            }
        })(req, res, next);
    });

    router.post('/sign-up', validationHandler(createUserSchema), async function(req, res, next){
        const { body : user } = req;
        try{
            const createUserId = await  userService.createUser( { user } );
            res.status(201).json({
                data: createUserId,
                message: 'usuario creado',
                created: true
            });
        }catch(error){
            next(error);
        }
    })

}

module.exports = authApi;