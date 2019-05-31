'use strict';

const { test } = require('tap');

const { withDB, randomObjectId } = require('../../test-helpers');
const seed = require('../../../seed');

const respostaModel = require('../../../src/core/models/resposta');

test(
  'model.resposta.create',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();

    const { _id: perguntaId } = await seed.entidades.pergunta({ usuarioId });

    const { dataCriacao: dataCriacaoFixture, ...resposta } = seed.fixtures.resposta({ usuarioId, perguntaId });

    const {
      _doc: { _id, __v, dataCriacao, ...createdResposta },
    } = await respostaModel.create(resposta);

    t.strictSame(createdResposta, resposta);
    t.ok(dataCriacao - dataCriacaoFixture < 250);

    t.end();
  })
);

test(
  'model.resposta.create: cadastra com referência para usuário inválida',
  withDB(async t => {
    const usuarioId = randomObjectId();

    const { _id: perguntaId } = await seed.entidades.pergunta();

    const resposta = seed.fixtures.resposta({ usuarioId, perguntaId });

    try {
      await respostaModel.create(resposta);
    } catch ({ message }) {
      t.same(message, 'Referência para usuário inválida');
    }

    t.end();
  })
);

test(
  'model.resposta.create: cadastra com referência para pergunta inválida',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();

    const perguntaId = randomObjectId();

    const resposta = seed.fixtures.resposta({ usuarioId, perguntaId });

    try {
      await respostaModel.create(resposta);
    } catch ({ message }) {
      t.same(message, 'Referência para pergunta inválida');
    }

    t.end();
  })
);

test(
  'model.resposta.find',
  withDB(async t => {
    const resposta = await seed.entidades.resposta();

    const {
      _doc: { __v, ...foundResposta },
    } = await respostaModel.find({ _id: resposta._id });

    t.strictSame(foundResposta, resposta);

    t.end();
  })
);

test(
  'model.resposta.update',
  withDB(async t => {
    const resposta = await seed.entidades.resposta();
    const alteracoes = { descricao: 'Teste 2' };

    const {
      _doc: { __v, ...updatedResposta },
    } = await respostaModel.update({ _id: resposta._id }, alteracoes);

    t.strictSame(updatedResposta, { ...resposta, ...alteracoes });

    t.end();
  })
);

test(
  'model.resposta.update: tenta atualizar id de usuário',
  withDB(async t => {
    const { _id: respostaId } = await seed.entidades.resposta();

    const usuarioId = randomObjectId();

    try {
      await respostaModel.update({ _id: respostaId }, { usuarioId });
    } catch ({ message }) {
      t.same(message, 'Referência de usuário da resposta não deve ser alterada');
    }

    t.end();
  })
);

test(
  'model.resposta.update: tenta atualizar id de pergunta',
  withDB(async t => {
    const { _id: respostaId } = await seed.entidades.resposta();

    const perguntaId = randomObjectId();

    try {
      await respostaModel.update({ _id: respostaId }, { perguntaId });
    } catch ({ message }) {
      t.same(message, 'Referência de pergunta associada à resposta não deve ser alterada');
    }

    t.end();
  })
);

test(
  'model.resposta.update: atualiza com id inválido',
  withDB(async t => {
    await t.rejects(respostaModel.update({ _id: randomObjectId() }, {}), new Error('Resposta não encontrada'));

    t.end();
  })
);

test(
  'model.resposta.findAll',
  withDB(async t => {
    const resposta = await seed.entidades.resposta();

    const foundRespostas = await respostaModel.findAll();
    const {
      _doc: { __v, ...foundResposta },
    } = foundRespostas[0];

    t.strictSame(foundResposta, resposta);
    t.strictSame(foundRespostas.length, 1);

    t.end();
  })
);

test(
  'model.resposta.delete',
  withDB(async t => {
    const resposta = await seed.entidades.resposta();

    const {
      _doc: { __v, ...deletedResposta },
    } = await respostaModel.delete({ _id: resposta._id });

    const foundRespostas = await respostaModel.findAll();

    t.strictSame(deletedResposta, resposta);
    t.strictSame(foundRespostas.length, 0);

    t.end();
  })
);

test(
  'model.resposta.delete: deleta com id inválido',
  withDB(async t => {
    await t.rejects(respostaModel.delete({ _id: randomObjectId() }), new Error('Resposta não encontrada'));

    t.end();
  })
);
