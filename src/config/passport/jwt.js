import passport from 'passport';  
import passportJWT from 'passport-jwt';
import db from 'db';
import config from 'config';

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy   = passportJWT.Strategy;

const User = db.sequelize.models.User;

var params = {  
    secretOrKey: config.passport.jwt.secret,
    jwtFromRequest: ExtractJwt.fromHeader()
};

export default (() => {

    let strategy = new Strategy(params, function(payload, done) {

        console.log(payload);
        User.findOne({ where : { email : payload.email }})
            .then( user => {
                
                if ( user ) {
                    return done(null, {
                        email : user.email
                    });
                } else {
                    return done(new Error("User not found"), null);
                }
                    
            });

    });

    passport.use(strategy);

    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate("jwt", { session : config.passport.jwt.session } );
        }
    };
})();