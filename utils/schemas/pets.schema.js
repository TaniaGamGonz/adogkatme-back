const joi = require('@hapi/joi');

const petIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const petStringSchema = joi.string();
const petBooleanSchema = joi.boolean();
const petArrayStringSchema = joi.array().items(joi.string());

const createPetSchema = {
    name: petStringSchema,
    type: petStringSchema.lowercase(),
    race: petStringSchema,
    owner: petStringSchema.lowercase(),
    gender: petStringSchema,
    health: petStringSchema,
    age: petStringSchema,
    size: petStringSchema,
    activity: petStringSchema,
    weight: joi.any(),
    country: petStringSchema,
    city: petStringSchema,
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
    play: petBooleanSchema,
    scape: petBooleanSchema,
    sleep: petBooleanSchema,
    bath: petBooleanSchema,
    eat: petBooleanSchema,
    takeAWalk: petBooleanSchema,
    car: petBooleanSchema,
}

module.exports = {
    petIdSchema,
    createPetSchema
}