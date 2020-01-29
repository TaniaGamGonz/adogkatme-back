const express = require('express');
const passport = require('passport');
const UserPetsService = require('../services/userPets.service');
const validationHandler = require('../utils/middlewares/validationHandler');
const { petIdSchema } = require('../utils/schemas/pets.schema');
const { userIdSchema } = require('../utils/schemas/users.schema');
const { createUserPetSchema } = require('../utils/schemas/userPets.schema');


//Validación de JWT
require('../utils/auth/jwt')


function userPetsApi(app) {
    const router = express.Router();
    app.use('/api/user-pets', router);

    const userPetsService = new UserPetsService();

    router.get('/', passport.authenticate('jwt', { session : false }), validationHandler({ userId: userIdSchema }, 'query'),
        async function (req, res, next) {
            const { userId } = req.query;

            try {
                const userPets = await userPetsService.getUserPets({ userId });

                res.status(200).json({
                    data: userPets,
                    message: 'Se han enviado las mascotas del usuario'
                })
            } catch (error) {
                next(error);
            }
        }
    );


    router.post('/', passport.authenticate('jwt', { session : false }), validationHandler(createUserPetSchema), async function (req, res, next){
        const { body : userPet } = req;

        try{
            const createdUserPetId = await userPetsService.createUserPet({ userPet });
            res.status(200).json({
                data: createdUserPetId,
                message: 'Creado mascota del usuario'
            })
        }catch(error){
            next(error);
        }
    });

    router.delete('/:userPetId', passport.authenticate('jwt', { session : false }), validationHandler({userPetId : petIdSchema}, 'params' ),
    async function (req, res, next){
        const { userPetId } = req.query;

        try{
            const deletedUserPetId = await userPetsService.deleteUserPet({ userPetId });
            res.status(200).json({
                data: deletedUserPetId,
                message: 'La pet del usuario ha sido borrada'
            })
        }catch(error){
            next(error);
        }
    })
}

module.exports = userPetsApi;
