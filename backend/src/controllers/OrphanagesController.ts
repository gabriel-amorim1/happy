import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import { HttpError } from '../errors/HttpError';

import orphanageView from '../views/orphanages_view';

import Orphanage from '../database/entities/Orphanage';
import * as model from '../models/orphanage'; 

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

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            image: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required(),
                }),
            ),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const orphanage = await model.create(<OrphanageInterface>data);

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
