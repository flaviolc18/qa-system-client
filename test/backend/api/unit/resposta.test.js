'use strict';

const { test } = require('tap');

const { initServer, randomObjectId } = require('../../../test-helpers');
const seed = require('../../../../seed');

test('api.respostas.create', async t => {
  const fastify = await initServer(t);

  const { _id: usuarioId } = await seed.entidades.usuario();

  const { _id: perguntaId } = await seed.entidades.pergunta({ usuarioId });

  const respostaData = seed.fixtures.resposta({ usuarioId: usuarioId.toString(), perguntaId: perguntaId.toString() });

  const { statusCode } = await fastify.inject({
    url: '/api/respostas',
    method: 'POST',
    payload: respostaData,
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.respostas.create: cadastra com referência para usuário inválida', async t => {
  const fastify = await initServer(t);

  const usuarioId = randomObjectId();

  const { _id: perguntaId } = await seed.entidades.pergunta();

  const respostaData = seed.fixtures.resposta({ usuarioId: usuarioId.toString(), perguntaId: perguntaId.toString() });

  const { statusCode, payload } = await fastify.inject({
    url: '/api/respostas',
    method: 'POST',
    payload: respostaData,
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Referência para usuário inválida');
  t.same(statusCode, 400);

  t.end();
});

test('api.respostas.create: cadastra com referência para pergunta inválida', async t => {
  const fastify = await initServer(t);

  const perguntaId = randomObjectId();

  const { _id: usuarioId } = await seed.entidades.usuario();

  const respostaData = seed.fixtures.resposta({ usuarioId: usuarioId.toString(), perguntaId: perguntaId.toString() });

  const { statusCode, payload } = await fastify.inject({
    url: '/api/respostas',
    method: 'POST',
    payload: respostaData,
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Referência para pergunta inválida');
  t.same(statusCode, 400);

  t.end();
});

test('api.respostas.delete', async t => {
  const fastify = await initServer(t);

  const resposta = await seed.entidades.resposta();

  const { statusCode } = await fastify.inject({
    url: `/api/respostas/${resposta._id}`,
    method: 'DELETE',
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.respostas.downvote', async t => {
  const fastify = await initServer(t);

  const resposta = await seed.entidades.resposta();

  const { statusCode } = await fastify.inject({
    url: `/api/respostas/downvote/${resposta._id}`,
    method: 'GET',
  });

  t.same(statusCode, 200);

  t.end();
});
test('api.respostas.upvote', async t => {
  const fastify = await initServer(t);

  const { statusCode } = await fastify.inject({
    url: '/api/respostas/upvote/',
    method: 'GET',
  });

  t.same(statusCode, 400);

  t.end();
});
test('api.respostas.downvote', async t => {
  const fastify = await initServer(t);

  const { statusCode } = await fastify.inject({
    url: '/api/respostas/downvote/',
    method: 'GET',
  });

  t.same(statusCode, 400);

  t.end();
});
test('api.repostas.downvote', async t => {
  const fastify = await initServer(t);

  const { statusCode } = await fastify.inject({
    url: `/api/repostas/downvote/${randomObjectId()}`,
    method: 'GET',
  });

  t.same(statusCode, 404);

  t.end();
});
test('api.repostas.upvote', async t => {
  const fastify = await initServer(t);

  const { statusCode } = await fastify.inject({
    url: `/api/repostas/upvote/${randomObjectId()}`,
    method: 'GET',
  });

  t.same(statusCode, 404);

  t.end();
});
test('api.perguntas.upvote', async t => {
  const fastify = await initServer(t);

  const resposta = await seed.entidades.resposta();

  const { statusCode } = await fastify.inject({
    url: `/api/respostas/upvote/${resposta._id}`,
    method: 'GET',
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.respostas.delete: passa id inválido', async t => {
  const fastify = await initServer(t);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/respostas/${randomObjectId()}`,
    method: 'DELETE',
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Not Found');
  t.same(statusCode, 404);

  t.end();
});

test('api.respostas.findAll', async t => {
  const fastify = await initServer(t);

  await seed.entidades.resposta({ nome: 'resposta 1' });
  await seed.entidades.resposta({ nome: 'resposta 2' });

  const { statusCode } = await fastify.inject({
    url: '/api/respostas',
    method: 'GET',
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.respostas.find', async t => {
  const fastify = await initServer(t);

  const resposta = await seed.entidades.resposta();

  const { statusCode } = await fastify.inject({
    url: `/api/respostas/${resposta._id}`,
    method: 'GET',
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.respostas.find: passa id inválido', async t => {
  const fastify = await initServer(t);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/respostas/${randomObjectId()}`,
    method: 'GET',
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Not Found');
  t.same(statusCode, 404);

  t.end();
});

test('api.respostas.update', async t => {
  const fastify = await initServer(t);

  const resposta = await seed.entidades.resposta();
  const alteracoes = { descricao: 'resposta atualizado' };

  const { statusCode } = await fastify.inject({
    url: `/api/respostas/${resposta._id}`,
    method: 'POST',
    payload: alteracoes,
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.respostas.update: passa id inválido', async t => {
  const fastify = await initServer(t);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/respostas/${randomObjectId()}`,
    method: 'POST',
    payload: {},
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Resposta não encontrada');
  t.same(statusCode, 400);

  t.end();
});

test('api.respostas.perguntas', async t => {
  const fastify = await initServer(t);

  const pergunta = await seed.entidades.pergunta();

  await seed.entidades.resposta({ perguntaId: pergunta._id });

  const { statusCode } = await fastify.inject({
    url: `/api/respostas/perguntas/${pergunta._id}`,
    method: 'GET',
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.respostas.usuarios', async t => {
  const fastify = await initServer(t);

  await seed.entidades.pergunta();
  const usuario = await seed.entidades.usuario();

  await seed.entidades.resposta({ usuarioId: usuario._id });

  const { statusCode } = await fastify.inject({
    url: `/api/respostas/usuarios/${usuario._id}`,
    method: 'GET',
  });

  t.same(statusCode, 200);

  t.end();
});
