'use strict';

const { test } = require('tap');

const { withDB, randomObjectId } = require('../../test-helpers');
const seed = require('../../../seed');

const sessionModel = require('../../../src/core/models/session');
const SessionModel = require('../../../src/core/models/session/session.model');

const { sessionExpirationTimeInDays } = require('../../../src/core/constants');

test(
  'model.session.create',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();

    const now = new Date();
    const maxDiffMill = 50;

    const {
      _doc: { _id, __v, ...createdSession },
    } = await sessionModel.create(usuarioId);

    t.strictSame(createdSession.usuarioId, usuarioId);
    t.ok(createdSession.dataCriacao - now <= maxDiffMill);

    const dataExpiracao = new Date(createdSession.dataCriacao);

    dataExpiracao.setDate(createdSession.dataCriacao.getDate() + sessionExpirationTimeInDays);

    t.strictSame(createdSession.dataExpiracao.getMilliseconds(), dataExpiracao.getMilliseconds());

    t.end();
  })
);

test(
  'model.session.create: cadastra com id de usuário inválido',
  withDB(async t => {
    const usuarioId = randomObjectId();

    try {
      await sessionModel.create(usuarioId);
    } catch ({ message }) {
      t.same(message, 'Referência para usuário inválida');
    }

    t.end();
  })
);

test(
  'model.session.find',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();

    const {
      _doc: { _id: sessionId, __v: v1, ...createdSession },
    } = await sessionModel.create(usuarioId);

    const {
      _doc: { _id, __v, ...foundSession },
    } = await sessionModel.find(sessionId);

    t.strictSame(foundSession, createdSession);

    t.end();
  })
);

test(
  'model.session.find: tenta recuperar uma session com id inválido',
  withDB(async t => {
    const usuarioId = randomObjectId();

    const session = await sessionModel.find(usuarioId);

    t.notOk(session);

    t.end();
  })
);

test(
  'model.session.find: tenta recuperar uma session expirada',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();

    const now = new Date();

    now.setDate(now.getDate() - (sessionExpirationTimeInDays + 1));

    const dataCriacao = new Date(now);
    const dataExpiracao = new Date(now);

    dataExpiracao.setDate(dataCriacao.getDate() + sessionExpirationTimeInDays);

    const session = new SessionModel({
      usuarioId,
      dataCriacao,
      dataExpiracao,
    });

    const createdSession = await session.save();

    const foundSession = await sessionModel.find(createdSession._id);

    t.notOk(foundSession);

    t.end();
  })
);

test(
  'model.session.delete',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();

    const {
      _doc: { _id: sessionId, __v: v1, ...createdSession },
    } = await sessionModel.create(usuarioId);

    const {
      _doc: { _id, __v, ...deletedSession },
    } = await sessionModel.delete(sessionId);

    const foundSession = await sessionModel.find(sessionId);

    t.notOk(foundSession);
    t.strictSame(deletedSession, createdSession);

    t.end();
  })
);

test(
  'model.session.delete: deleta com id inválido',
  withDB(async t => {
    const sessionId = randomObjectId();

    try {
      await sessionModel.delete(sessionId);
    } catch ({ message }) {
      t.same(message, 'Session não encontrada');
    }

    t.end();
  })
);
