import test from 'ava';

import connect from '../../database/connection';
import { create, getByEmail, remove } from '../../app/models/user';
import { fakeUserParams } from '../fakes/user';

test.before(async () => {
    await connect();
});

test.serial('user create', async (t) => {
    const user = await create(fakeUserParams);

    t.is(user.email, fakeUserParams.email);
    t.is(user.name, fakeUserParams.name);
    t.is(user.update_at, undefined);
    t.not(user.id, undefined);
    t.not(user.password_hash, undefined);
    t.not(user.created_at, undefined);
    await remove(<any>user.id);
});

test.serial('user getByEmail - return User', async (t) => {
    const user = await create(fakeUserParams);
    delete user.password;

    const returnedEmail = await getByEmail(user.email);

    t.deepEqual(user, returnedEmail);

    await remove(<any>user.id);
});

test.serial('user getByEmail - return undefined', async (t) => {
    const returnedEmail = await getByEmail(<any>'email');

    t.is(returnedEmail, undefined);
});
