import { Router } from 'express';
import ctrl from './user.ctrl';
import db from 'db';

const router = new Router();

router.get('/', ({ params }, res) => {
    res.send('200 Ok!!');
});

router.post('/', ctrl.signup);

export default router;