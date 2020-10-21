import test from 'ava';
import sinon from 'sinon';

import * as models from '../../app/models/user';
import * as controllers from '../../app/controllers/SessionController';
import * as sessionView from '../../app/views/sessions_view';
import { HttpError } from '../../app/errors/HttpError';

test.serial.afterEach.always(() => {
    sinon.restore();
});

test.serial('session create', async (t) => {
    const checkPasswordSpy = sinon.stub(models, 'checkPassword').resolves(true);

    const modelGetByEmailSpy = sinon
        .stub(models, 'getByEmail')
        .resolves(<any>'returnedUser');

    const renderSpy = sinon
        .stub(sessionView, 'render')
        .returns(<any>'renderedSession');

    const session = await controllers.create(<any>'email', <any>'password');

    t.deepEqual(session, <any>'renderedSession');
    t.true(modelGetByEmailSpy.calledOnceWithExactly(<any>'email'));
    t.true(renderSpy.calledOnceWithExactly(<any>'returnedUser'));
    t.true(
        checkPasswordSpy.calledOnceWithExactly(
            <any>'returnedUser',
            <any>'password',
        ),
    );
});

test.serial('session create - User not found', async (t) => {
    const modelGetByEmailSpy = sinon.stub(models, 'getByEmail').resolves();

    await t.throwsAsync(controllers.create(<any>'email', <any>'password'), {
        code: 401,
        instanceOf: HttpError,
        message: 'User not found',
    });

    t.true(modelGetByEmailSpy.calledOnceWithExactly(<any>'email'));
});

test.serial('session create - Password does no match', async (t) => {
    const modelGetByEmailSpy = sinon
        .stub(models, 'getByEmail')
        .resolves(<any>'returnedUser');

    const checkPasswordSpy = sinon
        .stub(models, 'checkPassword')
        .resolves(false);

    await t.throwsAsync(controllers.create(<any>'email', <any>'password'), {
        code: 401,
        instanceOf: HttpError,
        message: 'Password does no match',
    });

    t.true(modelGetByEmailSpy.calledOnceWithExactly(<any>'email'));
    t.true(
        checkPasswordSpy.calledOnceWithExactly(
            <any>'returnedUser',
            <any>'password',
        ),
    );
});
