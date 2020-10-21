import test from 'ava';
import sinon from 'sinon';

import * as models from '../../app/models/user';
import * as controllers from '../../app/controllers/UsersController';
import * as userView from '../../app/views/users_view';
import { HttpError } from '../../app/errors/HttpError';

test.serial.afterEach.always(() => {
    sinon.restore();
});

test.serial('user create', async (t) => {
    const modelGetByEmailSpy = sinon.stub(models, 'getByEmail').resolves();

    const modelCreateSpy = sinon
        .stub(models, 'create')
        .resolves(<any>'createdUser');

    const renderSpy = sinon
        .stub(userView, 'render')
        .returns(<any>'renderedUser');

    const user = await controllers.create(<any>{ email: 'email' });

    t.deepEqual(user, <any>'renderedUser');
    t.true(modelGetByEmailSpy.calledOnceWithExactly(<any>'email'));
    t.true(modelCreateSpy.calledOnceWithExactly(<any>{ email: 'email' }));
    t.true(renderSpy.calledOnceWithExactly(<any>'createdUser'));
});

test.serial('user create - Email already exists', async (t) => {
    const modelGetByEmailSpy = sinon
        .stub(models, 'getByEmail')
        .resolves(<any>'returnedUser');

    await t.throwsAsync(controllers.create(<any>{ email: 'email' }), {
        code: 400,
        instanceOf: HttpError,
        message: 'Email already exists',
    });

    t.true(modelGetByEmailSpy.calledOnceWithExactly(<any>'email'));
});
