const MongoLib = require('../lib/mongo');

class PetsService {
    constructor(){
        this.collection = 'pets';
        this.mongoDB = new MongoLib();
    }
    
    async getPets( { tags } ){
        const query = tags && { tags: { $in: tags }};
        const pets = await this.mongoDB.getAll(this.collection, query);
        return pets || [ ];
    }
    async getPet( { petId } ){
        const pet = await this.mongoDB.get(this.collection, petId);
        return pet || { };
    }
    async createPet({ pet } ) {
        const createPetId = await this.mongoDB.create(this.collection, pet);
        return createPetId;
    }
    async updatePet( { petId, pet } = { }) {
        const updatedPetId = await this.mongoDB.update(this.collection, petId, pet );
        return updatedPetId;
    }
    async deletePet( { petId } ) {
        const deletedPetId = await this.mongoDB.delete(this.collection, petId);
        return deletedPetId;
    }

}

module.exports = PetsService;