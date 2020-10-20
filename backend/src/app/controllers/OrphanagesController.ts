import { HttpError } from '../errors/HttpError';

import orphanageView from '../views/orphanages_view';

import * as model from '../models/orphanage';
import { handleDataToCreateOrphanage } from '../utils/orphanage/handler';
import {
    CreateOrphanageRequestInterface,
    OrphanageViewInterface,
} from '../interfaces/OrphanageInterface';

export const create = async (
    data: CreateOrphanageRequestInterface,
    files: Express.Multer.File[],
): Promise<OrphanageViewInterface> => {
    if (files.length === 0)
        throw new HttpError(400, 'files is a required field');

    const orphanageObject = handleDataToCreateOrphanage(data, files);

    const orphanage = await model.create(orphanageObject);

    return orphanageView.render(orphanage);
};

export const getById = async (id: string): Promise<OrphanageViewInterface> => {
    const orphanage = await model.getById(id);

    if (!orphanage) throw new HttpError(404, 'Orphanage not found');

    return orphanageView.render(orphanage);
};

export const getAll = async (): Promise<OrphanageViewInterface[]> => {
    const orphanages = await model.getAll();

    return orphanageView.renderMany(orphanages);
};
