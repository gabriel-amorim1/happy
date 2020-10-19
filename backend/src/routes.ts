import { Router } from 'express';
import multer from 'multer';
import { Request, Response } from 'express';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import { createValidation } from './utils/orphanage/validation';
import { HttpError } from './errors/HttpError';
import { imageValidation } from './utils/image/validation';

const routes = Router();
const upload = multer(uploadConfig);


routes.post(
    '/orphanages',
    upload.array('images'),
    async (req: Request, res: Response) => {
        const files = req.files as Express.Multer.File[];

        await createValidation.validate(req.body, {
            abortEarly: false,
        });
        
        const orphanage = await OrphanagesController.create(req.body, files);

        return res.status(201).json(orphanage);
    },
);

routes.get('/orphanages', OrphanagesController.getAll);
routes.get('/orphanages/:id', OrphanagesController.getById);

export default routes;