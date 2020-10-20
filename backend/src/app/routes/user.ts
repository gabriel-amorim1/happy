import { Router, Request, Response } from 'express';

import * as UsersController from '../controllers/UsersController';
import * as userValidator from '../utils/user/validator';

const routes = Router();

routes.post('/', async (req: Request, res: Response) => {
    await userValidator.createValidation.validate(req.body, {
        abortEarly: false,
    });

    const user = await UsersController.create(req.body);

    return res.status(201).json(user);
});

export default routes;
