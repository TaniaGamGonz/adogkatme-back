const express = require ('express');
const UserService = require('../services/user.service');
const { userIdSchema, createUserSchema } = require('../utils/schemas/users.schema');
const validationHandler  = require('../utils/middlewares/validationHandler.js')


function UserApi(app) {
    const router = express.Router( );
    const userService = new UserService();
    app.use("/api/user", router);


    router.get('/', async function(req, res, next){
        const { email } = req.query;
        try {
            const user = await userService.getUserByEmail({ email });
            res.status(200).json(user);
        }catch(err){
            next(err);
        }
    });

    router.get('/:userId',validationHandler({userId : userIdSchema}, 'params'), async function(req, res, next){
        const { userId } = req.params;
        try {
            const user = await userService.getUserById({ userId });

            res.status(200).json(user);
        }catch(err){
            next(err);
        }
    });

    router.post('/',validationHandler(createUserSchema), async function(req, res, next){
        const { body : user } = req; 
        try {
            const createdUserId = await userService.createUser( { user } );

            res.status(201).json(createdUserId);
        }catch(err){
            next(err);
        }
    });


    router.put('/:userId',validationHandler({userId : userIdSchema}, 'params'), async function(req, res, next){ 
        const { body : userFav } = req; 
        const { userId } = req.params;

        try {
            const updateduserId = await userService.updateUser({ userId, userFav  });

            res.status(200).json(updateduserId);
        }catch(err){
            next(err);
        }
    });




}

module.exports = UserApi;