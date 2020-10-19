import { Request, Response } from 'express';
import { HttpError } from '../errors/HttpError';

import orphanageView from '../views/orphanages_view';

import Orphanage from '../database/entities/Orphanage';
import * as model from '../models/orphanage'; 
import { createValidation } from '../utils/orphanage/validation';

export default {
    async create(request: Request, response: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = request.body;

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => ({ path: image.filename }));

        const data = <OrphanageInterface>{
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images,
        };

        await createValidation.validate(data, {
            abortEarly: false,
        });

        const orphanage = await model.create(data);

        return response.status(201).json(orphanage);
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
