const MongoLib = require('../lib/mongo.js');

class UserPetsService {
    constructor(){
        this.collection = 'user-pets';
        this.mongoDB = new MongoLib();
    }

    async getUserPets({ userId }){
        const query = userId && { userId };
        const userPets = await this.mongoDB.getAll(this.collection, query);

        return userPets || [];
    }

    async createUserPet( { userPet } ){
        const createdUserPetId =  await this.mongoDB.create(this.collection, userPet);
        return createdUserPetId;

    }
    async deleteUserPet ( { userPetId }){
        const deletedUserPetId =  await this.mongoDB.delete(this.collection, userPetId);
        return deletedUserPetId;
    }
}

module.exports = UserPetsService;