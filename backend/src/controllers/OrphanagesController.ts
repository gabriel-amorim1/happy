import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import orphanageView from '../views/orphanages_view';

import Orphanage from '../models/Orphanage';

export default {
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const orphanageRepository = getRepository(Orphanage);

        const orphanage = await orphanageRepository.findOneOrFail(id, {
            relations: ['images'],
        });

        return response.status(200).json(orphanageView.render(orphanage));
    },

    async index(request: Request, response: Response) {
        const orphanageRepository = getRepository(Orphanage);

        const orphanages = await orphanageRepository.find({
            relations: ['images'],
        });

        return response.status(200).json(orphanageView.renderMany(orphanages));
    },

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

        const orphanageRepository = getRepository(Orphanage);

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

        const orphanage = orphanageRepository.create(data);

        await orphanageRepository.save(orphanage);

        return response.status(201).json(orphanage);
    },
};
