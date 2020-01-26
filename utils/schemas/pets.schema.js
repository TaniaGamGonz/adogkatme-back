const joi = require('@hapi/joi');

const petIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const petStringSchema = joi.string();
const petBooleanSchema = joi.boolean();
const petArrayStringSchema = joi.array().items(joi.string());

const createPetSchema = {
    name: petStringSchema.required(),
    type: petStringSchema.required().lowercase(),
    race: petStringSchema,
    owner: petStringSchema.required().lowercase(),
    gender: petStringSchema.required(),
    health: petStringSchema.required(),
    age: petStringSchema,
    size: petStringSchema,
    activity: petStringSchema.required(),
    weight: petStringSchema.required(),
    country: petStringSchema.required(),
    city: petStringSchema.required(),
    PPPlicense: petBooleanSchema,
    description: petStringSchema,
    photos: petArrayStringSchema,
    videos: petArrayStringSchema,
    parasite: petBooleanSchema,
    vaccined: petBooleanSchema,
    sterilized: petBooleanSchema,
    primer: petBooleanSchema,
    chip: petBooleanSchema,
    leishmania: petBooleanSchema,
    treatment: petBooleanSchema,
    inmunodeficiency: petBooleanSchema,
    leukemia: petBooleanSchema,
    allergy: petBooleanSchema,
    allergies: petStringSchema,
    sociableKids: petBooleanSchema,
    sociablePeople: petBooleanSchema,
    sociableOtherAnimals: petBooleanSchema,
    sociablePets: petBooleanSchema,
    independence: petStringSchema,
    noisy: petStringSchema,
    adoptionReason: petStringSchema,
    play: petStringSchema,
    scape: petStringSchema,
    sleep: petStringSchema,
    bath: petStringSchema,
    eat: petStringSchema,
    takeAWalk: petStringSchema,
    car: petStringSchema,
}

module.exports = {
    petIdSchema,
    createPetSchema
}