import test from 'ava';
import sinon from 'sinon';

import * as models from '../../app/models/orphanage';
import * as controllers from '../../app/controllers/OrphanagesController';
import * as handlers from '../../app/utils/orphanage/handler';
import orphanageView from '../../app/views/orphanages_view';
import { HttpError } from '../../app/errors/HttpError';

test.serial.afterEach.always(() => {
    sinon.restore();
});

test.serial('orphanage create', async (t) => {
    const handleDataToCreateOrphanageSpy = sinon
        .stub(handlers, 'handleDataToCreateOrphanage')
        .returns(<any>'handledOrphanage');

    const modelSpy = sinon
        .stub(models, 'create')
        .resolves(<any>'createdOrphanage');

    const renderSpy = sinon
        .stub(orphanageView, 'render')
        .resolves(<any>'renderedOrphanage');

    const orphanage = await controllers.create(<any>'data', <any>['files']);

    t.deepEqual(orphanage, <any>'renderedOrphanage');
    t.true(modelSpy.calledOnceWithExactly(<any>'handledOrphanage'));
    t.true(renderSpy.calledOnceWithExactly(<any>'createdOrphanage'));
    t.true(
        handleDataToCreateOrphanageSpy.calledOnceWithExactly(
            <any>'data',
            <any>['files'],
        ),
    );
});

test.serial('orphanage create - files is a required field', async (t) => {
    await t.throwsAsync(controllers.create(<any>'data', <any>[]), {
        code: 400,
        instanceOf: HttpError,
        message: 'files is a required field',
    });
});

test.serial('orphanage getById', async (t) => {
    const modelSpy = sinon
        .stub(models, 'getById')
        .resolves(<any>'returnedOrphanage');

    const renderSpy = sinon
        .stub(orphanageView, 'render')
        .resolves(<any>'renderedOrphanage');

    const orphanage = await controllers.getById(<any>'id');

    t.deepEqual(orphanage, <any>'renderedOrphanage');
    t.true(modelSpy.calledOnceWithExactly(<any>'id'));
    t.true(renderSpy.calledOnceWithExactly(<any>'returnedOrphanage'));
});

test.serial('orphanage getById - Orphanage not found', async (t) => {
    const modelSpy = sinon.stub(models, 'getById').resolves(undefined);

    await t.throwsAsync(controllers.getById(<any>'id'), {
        code: 404,
        instanceOf: HttpError,
        message: 'Orphanage not found',
    });

    t.true(modelSpy.calledOnceWithExactly(<any>'id'));
});

test.serial('orphanage getAll - returned orphanages', async (t) => {
    const modelSpy = sinon.stub(models, 'getAll').resolves(<any>'orphanages');

    const renderSpy = sinon
        .stub(orphanageView, 'renderMany')
        .resolves(<any>'renderedOrphanages');

    const orphanages = await controllers.getAll();

    t.deepEqual(orphanages, <any>'renderedOrphanages');
    t.true(modelSpy.calledOnceWithExactly());
    t.true(renderSpy.calledOnceWithExactly(<any>'orphanages'));
});

test.serial('orphanage getAll - returned []', async (t) => {
    const modelSpy = sinon.stub(models, 'getAll').resolves(<any>[]);

    const renderSpy = sinon
        .stub(orphanageView, 'renderMany')
        .resolves(<any>'renderedOrphanages');

    const orphanages = await controllers.getAll();

    t.deepEqual(orphanages, <any>'renderedOrphanages');
    t.true(modelSpy.calledOnceWithExactly());
    t.true(renderSpy.calledOnceWithExactly(<any>[]));
});
