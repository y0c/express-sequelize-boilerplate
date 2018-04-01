import Sequelize from 'sequelize';
import config from './config';

export default callback => {
	// connect to a database if needed, then pass it to `callback`:
	const sequelize = new Sequelize(
		config.db.database,
		config.db.userName,
		config.db.userPassword, {
			host: config.db.host,
			dialect: config.db.dialect,
			operatorsAliases: false,

			pool: {
				max: 5,
				min: 0,
				acquire: 30000,
				idle: 10000
			}
		});

	// Or you can simply use a connection uri

	sequelize
		.authenticate()
		.then(() => {
			console.log('Connection has been established successfully.');
		})
		.catch(err => {
			console.error('Unable to connect to the database:', err);
		});
	callback();
}
