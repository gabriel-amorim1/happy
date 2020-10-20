import { Router, Request, Response } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';

import * as OrphanagesController from './app/controllers/OrphanagesController';
import * as SessionController from './app/controllers/SessionController';
import * as UsersController from './app/controllers/UsersController';

import * as orphanageValidator from './app/utils/orphanage/validator';
import * as sessionValidator from './app/utils/session/validator';
import * as userValidator from './app/utils/user/validator';

import authMiddleware from './app/middlewares/auth';

const routes = Router();
const upload = multer(uploadConfig);

routes.post(
    '/users',
    async (req: Request, res: Response) => {
        await userValidator.createValidation.validate(req.body, {
            abortEarly: false,
        });

        const user = await UsersController.create(req.body);

        return res.status(201).json(user);
    }
);

routes.post(
    '/sessions',
    async (req: Request, res: Response) => {
        await sessionValidator.createValidation.validate(req.body, {
            abortEarly: false,
        });
        const { email, password } = req.body;

        const session = await SessionController.create(email, password);

        return res.status(201).json(session);
    }
);

routes.use(authMiddleware);

routes.post(
    '/orphanages',
    upload.array('images'),
    async (req: Request, res: Response) => {
        const files = req.files as Express.Multer.File[];

        await orphanageValidator.createValidation.validate(req.body, {
            abortEarly: false,
        });
        
        const orphanage = await OrphanagesController.create(req.body, files);

        return res.status(201).json(orphanage);
    },
);

routes.get('/orphanages',
    async (req: Request, res: Response) => {
        const orphanages = await OrphanagesController.getAll();

        return res.status(200).json(orphanages);
    },
);

routes.get(
    '/orphanages/:id',
    async (req: Request, res: Response) => {
        const { id } = req.params;
        await orphanageValidator.idValidation.validate(req.params, {
            abortEarly: false,
        });

        const orphanage = await OrphanagesController.getById(id);

        return res.status(200).json(orphanage);
    },
);

export default routes;