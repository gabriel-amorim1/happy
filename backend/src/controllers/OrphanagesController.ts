import { HttpError } from '../errors/HttpError';

import orphanageView from '../views/orphanages_view';

import * as model from '../models/orphanage'; 
import { handleDataToCreateOrphanage } from '../utils/orphanage/handler';

export default {
    async create(data: CreateOrphanageRequestInterface, files: Express.Multer.File[]) {
        if (files.length === 0) throw new HttpError(400, 'files is a required field');

        const orphanageObject = handleDataToCreateOrphanage(data, files);
        
        const orphanage = await model.create(orphanageObject);

        return orphanageView.render(orphanage);
    },

    async getById(id: string) {
        const orphanage = await model.getById(id);

        if (!orphanage) throw new HttpError(404, 'Orphanage not found');

        return orphanageView.render(orphanage);
    },

    async getAll() {
        const orphanages = await model.getAll();
        
        return orphanageView.renderMany(orphanages)
    },
};
