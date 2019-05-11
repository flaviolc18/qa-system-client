'use strict';

const { test } = require('tap');

const { initServer, randomObjectId } = require('../../../test-helpers');
const seed = require('../../../../seed');

test('api.perguntas.create', async t => {
  const fastify = await initServer(t);

  const { _id: usuarioId } = await seed.entidades.usuario();

  const perguntaData = seed.fixtures.pergunta({ usuarioId: usuarioId.toString() });

  const { statusCode } = await fastify.inject({
    url: '/api/perguntas',
    method: 'POST',
    payload: perguntaData,
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.perguntas.create: cadastra com referência para usuário inválida', async t => {
  const fastify = await initServer(t);

  const usuarioId = randomObjectId();

  const perguntaData = seed.fixtures.pergunta({ usuarioId: usuarioId.toString() });

  const { statusCode, payload } = await fastify.inject({
    url: '/api/perguntas',
    method: 'POST',
    payload: perguntaData,
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Referência para usuário inválida');
  t.same(statusCode, 400);

  t.end();
});

test('api.perguntas.delete', async t => {
  const fastify = await initServer(t);

  const pergunta = await seed.entidades.pergunta();

  const { statusCode } = await fastify.inject({
    url: `/api/perguntas/${pergunta._id}`,
    method: 'DELETE',
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.perguntas.delete: passa id inválido', async t => {
  const fastify = await initServer(t);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/perguntas/${randomObjectId()}`,
    method: 'DELETE',
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Not Found');
  t.same(statusCode, 404);

  t.end();
});

test('api.perguntas.findAll', async t => {
  const fastify = await initServer(t);

  await seed.entidades.pergunta({ nome: 'pergunta 1' });
  await seed.entidades.pergunta({ nome: 'pergunta 2' });

  const { statusCode } = await fastify.inject({
    url: '/api/perguntas',
    method: 'GET',
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.perguntas.find', async t => {
  const fastify = await initServer(t);

  const pergunta = await seed.entidades.pergunta();

  const { statusCode } = await fastify.inject({
    url: `/api/perguntas/${pergunta._id}`,
    method: 'GET',
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.perguntas.find: passa id inválido', async t => {
  const fastify = await initServer(t);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/perguntas/${randomObjectId()}`,
    method: 'GET',
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Not Found');
  t.same(statusCode, 404);

  t.end();
});

test('api.perguntas.update', async t => {
  const fastify = await initServer(t);

  const pergunta = await seed.entidades.pergunta();
  const alteracoes = { descricao: 'pergunta atualizado' };

  const { statusCode } = await fastify.inject({
    url: `/api/perguntas/${pergunta._id}`,
    method: 'POST',
    payload: alteracoes,
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.perguntas.update: passa id inválido', async t => {
  const fastify = await initServer(t);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/perguntas/${randomObjectId()}`,
    method: 'POST',
    payload: {},
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Pergunta não encontrada');
  t.same(statusCode, 400);

  t.end();
});

test('api.perguntas.usuarios', async t => {
  const fastify = await initServer(t);

  const usuario = await seed.entidades.usuario();

  await seed.entidades.pergunta({ usuarioId: usuario._id });

  const { statusCode } = await fastify.inject({
    url: `/api/perguntas/usuarios/${usuario._id}`,
    method: 'GET',
  });

  t.same(statusCode, 200);

  t.end();
});
