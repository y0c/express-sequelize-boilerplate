import db from 'db';

const User = db.sequelize.models.User;

const ctrl = {};

ctrl.signup = async ({ body }, res) => {
    const user = await User.create({ email: body.email, password: body.password });

    if (user) {
        res.send({ data: { user } });
    }
}

export default ctrl;