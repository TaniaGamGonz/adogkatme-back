const MongoLib = require('../lib/mongo.js')
const bcrypt = require('bcrypt');

class UsersService {
    constructor(){
        this.collection = 'users';
        this.mongoDB = new MongoLib();
    }

    async getUser( { email } ){
        const [ user ] = await this.mongoDB.getAll(this.collection, { email });
        return user;
    }

    async createUser( { user } ){
        const hashedPassword = await bcrypt.hash(user.password, 10);

        user.password = hashedPassword;

        const createUserId = await this.mongoDB.create(this.collection, user);

        return createUserId;
    }
}

module.exports = UsersService;