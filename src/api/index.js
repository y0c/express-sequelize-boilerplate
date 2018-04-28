import { version } from '../../package.json';
import { Router } from 'express';
import authJwt from 'config/passport/jwt';
import user from './user';

export default (() => {
	let api = Router();

	api.use(authJwt.initialize());
	api.use('/user', user);

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
})();
