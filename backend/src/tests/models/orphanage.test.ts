import test from 'ava';

import connect from '../../database/connection';
import { create, getAll, getById } from '../../app/models/orphanage';
import {
    fakeOrphanageDoNotOpenOnWeekends,
    fakeOrphanageOpenOnWeekends,
} from '../fakes/orphanage';

test.before(async () => {
    await connect();
});

test.serial('orphanage create - do not open on weekends', async (t) => {
    const { id, ...orphanage } = await create(fakeOrphanageOpenOnWeekends);

    t.deepEqual(orphanage, fakeOrphanageOpenOnWeekends);
    t.not(id, undefined);
});

test.serial('orphanage create - open on weekends', async (t) => {
    const { id, ...orphanage } = await create(fakeOrphanageDoNotOpenOnWeekends);

    t.deepEqual(orphanage, fakeOrphanageDoNotOpenOnWeekends);
    t.not(id, undefined);
});

test.serial('orphanage getById - return orphanage', async (t) => {
    const { images: createdImages, ...orphanage } = await create(
        fakeOrphanageDoNotOpenOnWeekends,
    );
    const returnedOrphanage = await getById(<any>orphanage.id!);

    const { images, ...entityProps } = returnedOrphanage!;

    t.deepEqual(orphanage, entityProps);
    t.deepEqual({ ...images[0] }, createdImages[0]);
});

test.serial('orphanage getById - return undefined', async (t) => {
    const returnedOrphanage = await getById(<any>'id');

    t.deepEqual(returnedOrphanage, undefined);
});

test.serial('orphanage getAll - return orphanages', async (t) => {
    const orphanage1 = await create(fakeOrphanageOpenOnWeekends);
    const orphanage2 = await create(fakeOrphanageDoNotOpenOnWeekends);
    const orphanages = await getAll();

    const mapIds = orphanages.map((orphanage) => {
        return orphanage.id!;
    });

    t.true(mapIds.includes(orphanage1.id!));
    t.true(mapIds.includes(orphanage2.id!));
});
