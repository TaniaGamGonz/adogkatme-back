const MongoLib = require('../lib/mongo.js')
const bcrypt = require('bcrypt');

class UsersService {
    constructor(){
        this.collection = 'users';
        this.mongoDB = new MongoLib();
    }

    async getUserByEmail( { email } ){
        const [ user ] = await this.mongoDB.getAll(this.collection, { email });
        return user;
    }

    async getUserById( { userId } ){
        const user = await this.mongoDB.get(this.collection, userId );
        return user || {};
    }

    async createUser( { user } ){
        const hashedPassword = await bcrypt.hash(user.password, 10);

        user.password = hashedPassword;

        const createUserId = await this.mongoDB.create(this.collection, user);

        return createUserId;
    }

    async favouritesPets( userId, { petId }){
        const user = await this.mongoDB.get(this.collection, userId);
        let  userFavorites = user.favorites;
        const isAlreadyFavourite =  user.favorites.includes(petId);
        let favorites;

        if(isAlreadyFavourite){
            const removedPetFavorites = userFavorites.filter(pets => pets==!petId);
            favorites  = { favorites : removedPetFavorites}
                
         }else{
             user.favorites.push(petId);
             favorites = { favorites : userFavorites };      
         }
 
         const userFavoritesUpdate =  this.mongoDB.update(this.collection, userId, favorites )
 
         return userFavoritesUpdate

        
    }


}

module.exports = UsersService;