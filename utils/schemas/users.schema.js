const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0/9a-fA-F]{24}$/);
const createUserSchema = {
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    surname: joi.string(),
    age: joi.number(),
    gender: joi.string(),
    interestedIn: joi.array(),
    phone: joi.string(),
    livingPlace: joi.array(),
    pets: joi.array(),
    country: joi.array(),
    city: joi.array(),
    photo: joi.string(),
}

module.exports = {
    userIdSchema,
    createUserSchema
}