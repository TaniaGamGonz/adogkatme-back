const joi = require('@hapi/joi');


const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);


const createUserSchema = {
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    surname: joi.string(),
    age: joi.string(),
    gender: joi.string(),
    interestedIn:  joi.array().items(joi.string()),
    phone: joi.string(),
    livingPlace: joi.string(),
    pets:  joi.array().items(joi.string()),
    country: joi.string(),
    city: joi.string(),
    photo: joi.string().allow(""),
    receptions: joi.string().allow(""),
    adoptions: joi.string().allow(""),
    inAdoption: joi.array(),
    favorites: joi.array(),

}

module.exports = {
    userIdSchema,
    createUserSchema
}