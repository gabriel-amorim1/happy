import test from 'ava';

import connect from '../../database/connection';
import { create } from '../../app/models/orphanage';
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
