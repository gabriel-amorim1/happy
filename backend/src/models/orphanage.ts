import { getRepository } from 'typeorm';

import Orphanage from "../database/entities/Orphanage";

export const create = async (
    orphanageObject: OrphanageInterface,
): Promise<OrphanageInterface> => {
    const orphanageRepository = getRepository(Orphanage);
    
    const orphanage = orphanageRepository.create(orphanageObject);

    await orphanageRepository.save(orphanage);

    return orphanage;
};

export const getById = async (
    id: string,
): Promise<OrphanageInterface | undefined> => {
    const orphanage = await getRepository(Orphanage)
        .findOne(id, {
            relations: ['images'],
        });

    return orphanage;
};

export const getAll = async (
): Promise<OrphanageInterface[]> => {
    const orphanages = await getRepository(Orphanage).find({
        relations: ['images'],
    });

    return orphanages;
};