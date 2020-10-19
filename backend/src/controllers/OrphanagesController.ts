import { Request, Response } from 'express';
import { HttpError } from '../errors/HttpError';

import orphanageView from '../views/orphanages_view';

import Orphanage from '../database/entities/Orphanage';
import * as model from '../models/orphanage'; 
import { createValidation } from '../utils/orphanage/validation';
import { handleDataToCreateOrphanage } from '../utils/orphanage/handler';

export default {
    async create(data: CreateOrphanageRequestInterface, files: Express.Multer.File[]) {
        if (files.length === 0) throw new HttpError(400, 'files is a required field');

        const orphanageObject = handleDataToCreateOrphanage(data, files);
        
        const orphanage = await model.create(orphanageObject);

        return orphanage;
    },

    async getById(request: Request, response: Response) {
        const { id } = request.params;

        const orphanage = await model.getById(id);

        if (!orphanage) throw new HttpError(404, 'Orphanage not found');

        return response.status(200).json(orphanageView.render(orphanage));
    },

    async getAll(request: Request, response: Response) {
        const orphanages = await model.getAll();

        return response.status(200).json(orphanageView.renderMany(orphanages));
    },
};
