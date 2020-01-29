const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

const UserService = require('../../services/user.service');
const { config } = require('../../config/index');

passport.use(
    new Strategy({
        secretOrKey: config.atuhJwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },

    async function(tokenPayload, cb){
        const userService = new UserService();

        try{
            const user = await userService.getUser( { email: tokenPayload.email } ); 

            if(!user){
                cb(boom.unauthorized(), false);
            }
            delete user.password

            cb(null, {...user, scopes: tokenPayload.scopes})
        }catch(error){
            return cb(error);

        }
    }
    )
)