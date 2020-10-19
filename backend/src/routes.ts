import { Router } from 'express';
import multer from 'multer';
import { Request, Response } from 'express';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import { createValidation, idValidation } from './utils/orphanage/validation';

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
        await idValidation.validate(req.params, {
            abortEarly: false,
        });

        const orphanage = await OrphanagesController.getById(id);

        return res.status(200).json(orphanage);
    },
);

export default routes;