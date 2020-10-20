import { Router } from 'express';

import userRoute from './user';
import sessionRoute from './session';
import orphanageRoute from './orphanage';

import authMiddleware from '../middlewares/auth';

const routes = Router();

routes.use('/users', userRoute);
routes.use('/sessions', sessionRoute);
routes.use(authMiddleware);
routes.use('/orphanages', orphanageRoute);

export default routes;
