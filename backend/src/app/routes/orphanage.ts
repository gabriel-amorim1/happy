import { Router, Request, Response } from 'express';
import multer from 'multer';

import uploadConfig from '../../config/upload';
import * as OrphanagesController from '../controllers/OrphanagesController';
import * as orphanageValidator from '../utils/orphanage/validator';

const routes = Router();
const upload = multer(uploadConfig);

routes.post(
    '/',
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

routes.get('/', async (req: Request, res: Response) => {
    const orphanages = await OrphanagesController.getAll();

    return res.status(200).json(orphanages);
});

routes.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    await orphanageValidator.idValidation.validate(req.params, {
        abortEarly: false,
    });

    const orphanage = await OrphanagesController.getById(id);

    return res.status(200).json(orphanage);
});

export default routes;
