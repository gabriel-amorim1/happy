import { getRepository } from 'typeorm';

import Orphanage from '../../database/entities/Orphanage';
import { OrphanageInterface } from '../interfaces/OrphanageInterface';

export const create = async (
    orphanageObject: OrphanageInterface,
): Promise<OrphanageInterface> => {
    const orphanageEntity = Object.assign(new Orphanage(), orphanageObject);

    return getRepository(Orphanage).save(orphanageEntity);
};

export const getById = async (
    id: string,
): Promise<OrphanageInterface | undefined> => {
    const orphanage = await getRepository(Orphanage).findOne(id, {
        relations: ['images'],
    });

    return orphanage;
};

export const getAll = async (): Promise<OrphanageInterface[]> => {
    const orphanages = await getRepository(Orphanage).find({
        relations: ['images'],
    });

    return orphanages;
};
