import db from 'db';
import config from 'config';
import jwt from 'jsonwebtoken';

const User = db.sequelize.models.User;

const ctrl = {};

ctrl.signup = async ({ body }, res) => {

    try {
        const user = await User.create({ email: body.email, password: body.password });

        if (user) {
            res.json( 200, { message : 'success' });
        } else { 
            res.json( 500, { message : 'something wrong!'});
        }
    } catch ( error ) {
        res.json( 500, { error } );
    } 

};

ctrl.signin = async ({ body }, res) => {
    let email, password;

    if ( body.email && body.password ) {
        email = body.email;
        password = body.password;
    } 

    try {
        const findUser = await User.findOne({ where : { email }});
        if ( !findUser ) { 
            res.json( 401, { message : 'no search user found'});
        } else {
            if ( findUser.verify(password) ) { 
                let payload = { email : findUser.email };
                let token = jwt.sign(payload, config.passport.jwt.secret );

                res.json( 200, { message : 'success', token });

            } else {
                res.json( 401, { message : 'password did not match '});
            }
        }
    } catch ( error ) {
        res.json( 500, { error });
    }


};


ctrl.me = async ({ body, user }, res ) => {
    res.json(200, { user });
};

export default ctrl;