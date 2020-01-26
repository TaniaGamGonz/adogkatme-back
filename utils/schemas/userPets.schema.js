const joi = require('@hapi/joi');
const { petIdSchema } = require('./pets.schema.js');
const { userIdSchema } = require('./users.schema.js');

const userPetIdSchema = joi.string().regex(/^[0/9a-fA-F]{24}$/);


const createUserPetSchema = {
    userId: userIdSchema,
    petId: petIdSchema

}

module.exports = {
    userPetIdSchema,
    createUserPetSchema
}