'use strict';

const { test } = require('tap');

const { withDB, randomObjectId } = require('../../test-helpers');
const seed = require('../../../seed');

const perguntaModel = require('../../../src/core/models/pergunta');

test(
  'model.pergunta.create',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();

    const { dataCriacao: dataCriacaoFixture, ...pergunta } = seed.fixtures.pergunta({ usuarioId });

    const {
      _doc: { _id, __v, dataCriacao, ...createdPergunta },
    } = await perguntaModel.create(pergunta);

    t.strictSame(createdPergunta, pergunta);
    t.ok(dataCriacao - dataCriacaoFixture < 250);

    t.end();
  })
);

test(
  'model.pergunta.create',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();

    const pergunta = seed.fixtures.pergunta({ usuarioId, tags: ['1, 2,3, 4'] });

    const {
      _doc: { _id, __v, ...createdPergunta },
    } = await perguntaModel.create(pergunta);

    pergunta.tags = pergunta.tags.slice(',').map(t => {
      if (t[0] === ' ') {
        return t.slice(1);
      }

      return t;
    });
    if (new Date(createdPergunta.dataCriacao) - new Date(pergunta.dataCriacao) <= 10) {
      createdPergunta.dataCriacao = pergunta.dataCriacao;
    }

    t.strictSame(createdPergunta, pergunta);

    t.end();
  })
);

test(
  'model.pergunta.create',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();
    const pergunta = seed.fixtures.pergunta({ usuarioId, tags: ['1', ' 2', ''] });

    const {
      _doc: { _id, __v, ...createdPergunta },
    } = await perguntaModel.create(pergunta);

    pergunta.tags = pergunta.tags.map(t => {
      if (t[0] === ' ') {
        return t.slice(1);
      }

      return t;
    });

    pergunta.tags = pergunta.tags.filter(t => t !== '' && t !== ' ');

    if (new Date(createdPergunta.dataCriacao) - new Date(pergunta.dataCriacao) <= 10) {
      createdPergunta.dataCriacao = pergunta.dataCriacao;
    }

    t.strictSame(createdPergunta, pergunta);

    t.end();
  })
);

test(
  'model.pergunta.create: cadastra com id de usuário inválido',
  withDB(async t => {
    const usuarioId = randomObjectId();

    const pergunta = seed.fixtures.pergunta({ usuarioId });

    try {
      await perguntaModel.create(pergunta);
    } catch ({ message }) {
      t.same(message, 'Referência para usuário inválida');
    }

    t.end();
  })
);

test(
  'model.pergunta.find',
  withDB(async t => {
    const pergunta = await seed.entidades.pergunta();

    const {
      _doc: { __v, ...foundPergunta },
    } = await perguntaModel.find({ _id: pergunta._id });

    t.strictSame(foundPergunta, pergunta);

    t.end();
  })
);

test(
  'model.pergunta.update',
  withDB(async t => {
    const pergunta = await seed.entidades.pergunta();
    const alteracoes = { descricao: 'Teste 2' };

    const {
      _doc: { __v, ...updatedPergunta },
    } = await perguntaModel.update({ _id: pergunta._id }, alteracoes);

    t.strictSame(updatedPergunta, { ...pergunta, ...alteracoes });

    t.end();
  })
);

test(
  'model.pergunta.update: tenta atualizar id de usuário',
  withDB(async t => {
    const { _id: perguntaId } = await seed.entidades.pergunta();

    const usuarioId = randomObjectId();

    try {
      await perguntaModel.update({ _id: perguntaId }, { usuarioId });
    } catch ({ message }) {
      t.same(message, 'Referência de usuário da pergunta não deve ser alterada');
    }

    t.end();
  })
);

test(
  'model.pergunta.findAll',
  withDB(async t => {
    const pergunta = await seed.entidades.pergunta();

    const foundPerguntas = await perguntaModel.findAll();
    const {
      _doc: { __v, ...foundPergunta },
    } = foundPerguntas[0];

    t.strictSame(foundPergunta, pergunta);
    t.strictSame(foundPerguntas.length, 1);

    t.end();
  })
);

test(
  'model.pergunta.delete',
  withDB(async t => {
    const pergunta = await seed.entidades.pergunta();

    const {
      _doc: { __v, ...deletedPergunta },
    } = await perguntaModel.delete({ _id: pergunta._id });

    const foundPerguntas = await perguntaModel.findAll();

    t.strictSame(deletedPergunta, pergunta);
    t.strictSame(foundPerguntas.length, 0);

    t.end();
  })
);
