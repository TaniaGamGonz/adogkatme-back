const express = require ('express');
const PetsService = require('../services/pet.service');
const { petIdSchema, createPetSchema } = require('../utils/schemas/pets.schema.js');
const validationHandler  = require('../utils/middlewares/validationHandler.js')


function petsApi(app) {
    const router = express.Router( );
    const petsService = new PetsService();
    app.use("/api/pets", router);


    router.get('/', async function(req, res, next){
        const { tags } = req.query;
        try {
            const pets = await petsService.getPets({ tags });
            res.status(200).json(pets);
        }catch(err){
            next(err);
        }
    });

    router.get('/:petId',validationHandler({petId : petIdSchema}, 'params'), async function(req, res, next){
        const { petId } = req.params;
        try {
            const pets = await petsService.getPet({ petId });

            res.status(200).json(pets);
        }catch(err){
            next(err);
        }
    });

    router.post('/',validationHandler(createPetSchema), async function(req, res, next){
        const { body : pet } = req; 
        try {
            const createdPetId = await petsService.createPet( { pet } );

            res.status(201).json(createdPetId);
        }catch(err){
            next(err);
        }
    });


    router.put('/:petId',validationHandler({petId : petIdSchema}, 'params'), async function(req, res, next){ 
        const { body : pet } = req; 
        const { petId } = req.params;

        try {
            const updatedPetId = await petsService.updatePet({ petId, pet  });

            res.status(200).json(updatedPetId);
        }catch(err){
            next(err);
        }
    });

    router.delete('/:petId',validationHandler({petId: petIdSchema}, 'params'), async function(req, res, next){
        const { petId } = req.params;

        try {
            const deletedPetId = await petsService.deletePet({ petId });

            res.status(200).json(deletedPetId);
        }catch(err){
            next(err);
        }
    })

}

module.exports = petsApi;