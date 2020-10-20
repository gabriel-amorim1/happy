import { Router, Request, Response } from 'express';

import * as sessionValidator from '../utils/session/validator';
import * as SessionController from '../controllers/SessionController';

const routes = Router();

routes.post('/', async (req: Request, res: Response) => {
    await sessionValidator.createValidation.validate(req.body, {
        abortEarly: false,
    });
    const { email, password } = req.body;

    const session = await SessionController.create(email, password);

    return res.status(201).json(session);
});

export default routes;
