'use strict';

const { test } = require('tap');

const { initServer, randomObjectId } = require('../../../test-helpers');
const seed = require('../../../../seed');

const getCookie = async ({ fastify, payload }) => {
  const { headers } = await fastify.inject({
    url: '/api/usuarios/login',
    method: 'POST',
    payload,
  });

  return headers['set-cookie'];
};

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

  const usuario = seed.fixtures.usuario();
  const { _id: usuarioId } = await seed.entidades.usuario(usuario);
  const resposta = await seed.entidades.resposta({ usuarioId });

  const cookie = await getCookie({ fastify, payload: { username: usuario.username, password: usuario.password } });

  const { statusCode } = await fastify.inject({
    url: `/api/respostas/${resposta._id}`,
    method: 'DELETE',
    headers: { cookie },
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

test('api.respostas.update: somente usuario que postou a resposta pode deletá-la', async t => {
  const fastify = await initServer(t);

  const usuario1 = await seed.entidades.usuario();
  const usuario2 = seed.fixtures.usuario();

  await seed.entidades.usuario(usuario2);
  const resposta = await seed.entidades.resposta({ usuarioId: usuario1._id });

  const cookie = await getCookie({ fastify, payload: { username: usuario2.username, password: usuario2.password } });

  const { statusCode, payload } = await fastify.inject({
    url: `/api/respostas/${resposta._id}`,
    method: 'DELETE',
    headers: { cookie },
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Somente o usuário que postou a resposta pode deletá-la');
  t.same(statusCode, 401);

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

  const usuario = seed.fixtures.usuario();
  const { _id: usuarioId } = await seed.entidades.usuario(usuario);
  const resposta = await seed.entidades.resposta({ usuarioId });
  const alteracoes = { descricao: 'resposta atualizado' };

  const cookie = await getCookie({ fastify, payload: { username: usuario.username, password: usuario.password } });

  const { statusCode } = await fastify.inject({
    url: `/api/respostas/${resposta._id}`,
    method: 'POST',
    payload: alteracoes,
    headers: { cookie },
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

  t.same(message, 'Not Found');
  t.same(statusCode, 404);

  t.end();
});

test('api.respostas.update: tenta atualizar usuarioId', async t => {
  const fastify = await initServer(t);

  const usuario = seed.fixtures.usuario();
  const { _id: usuarioId } = await seed.entidades.usuario(usuario);
  const resposta = await seed.entidades.resposta({ usuarioId });
  const alteracoes = { usuarioId: 'nao pode migao' };

  const cookie = await getCookie({ fastify, payload: { username: usuario.username, password: usuario.password } });

  const { statusCode, payload } = await fastify.inject({
    url: `/api/respostas/${resposta._id}`,
    method: 'POST',
    payload: alteracoes,
    headers: { cookie },
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Referência de usuário da resposta não deve ser alterada');
  t.same(statusCode, 400);

  t.end();
});

test('api.respostas.update: somente usuario que postou a resposta pode editá-la', async t => {
  const fastify = await initServer(t);

  const usuario1 = await seed.entidades.usuario();
  const usuario2 = seed.fixtures.usuario();

  await seed.entidades.usuario(usuario2);
  const resposta = await seed.entidades.resposta({ usuarioId: usuario1._id });
  const alteracoes = { descricao: 'resposta atualizado' };

  const cookie = await getCookie({ fastify, payload: { username: usuario2.username, password: usuario2.password } });

  const { statusCode, payload } = await fastify.inject({
    url: `/api/respostas/${resposta._id}`,
    method: 'POST',
    payload: alteracoes,
    headers: { cookie },
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Somente o usuário que postou a resposta pode editá-la');
  t.same(statusCode, 401);

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
