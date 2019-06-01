'use strict';

const { test } = require('tap');

const { initServer, randomObjectId } = require('../../../test-helpers');
const seed = require('../../../../seed');
const utils = require('../../../../src/utils');

const getCookie = async ({ fastify, payload }) => {
  const { headers } = await fastify.inject({
    url: '/api/usuarios/login',
    method: 'POST',
    payload,
  });

  return headers['set-cookie'];
};

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

  const usuario = seed.fixtures.usuario();
  const { _id: usuarioId } = await seed.entidades.usuario(usuario);
  const pergunta = await seed.entidades.pergunta({ usuarioId });

  const cookie = await getCookie({ fastify, payload: { username: usuario.username, password: usuario.password } });

  const { statusCode } = await fastify.inject({
    url: `/api/perguntas/${pergunta._id}`,
    method: 'DELETE',
    headers: { cookie },
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

test('api.perguntas.update: somente usuario que postou a pergunta pode deletá-la', async t => {
  const fastify = await initServer(t);

  const usuario1 = await seed.entidades.usuario();
  const usuario2 = seed.fixtures.usuario();

  await seed.entidades.usuario(usuario2);
  const pergunta = await seed.entidades.pergunta({ usuarioId: usuario1._id });

  const cookie = await getCookie({ fastify, payload: { username: usuario2.username, password: usuario2.password } });

  const { statusCode, payload } = await fastify.inject({
    url: `/api/perguntas/${pergunta._id}`,
    method: 'DELETE',
    headers: { cookie },
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Somente o usuário que postou a pergunta pode deletá-la');
  t.same(statusCode, 401);

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

  const usuario = seed.fixtures.usuario();
  const { _id: usuarioId } = await seed.entidades.usuario(usuario);
  const pergunta = await seed.entidades.pergunta({ usuarioId });
  const alteracoes = { descricao: 'pergunta atualizado' };

  const cookie = await getCookie({ fastify, payload: { username: usuario.username, password: usuario.password } });

  const { statusCode } = await fastify.inject({
    url: `/api/perguntas/${pergunta._id}`,
    method: 'POST',
    payload: alteracoes,
    headers: { cookie },
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

  t.same(message, 'Not Found');
  t.same(statusCode, 404);

  t.end();
});

test('api.perguntas.update: tenta atualizar usuarioId', async t => {
  const fastify = await initServer(t);

  const usuario = seed.fixtures.usuario();
  const { _id: usuarioId } = await seed.entidades.usuario(usuario);
  const pergunta = await seed.entidades.pergunta({ usuarioId });
  const alteracoes = { usuarioId: 'nao pode migao' };

  const cookie = await getCookie({ fastify, payload: { username: usuario.username, password: usuario.password } });

  const { statusCode, payload } = await fastify.inject({
    url: `/api/perguntas/${pergunta._id}`,
    method: 'POST',
    payload: alteracoes,
    headers: { cookie },
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Referência de usuário da pergunta não deve ser alterada');
  t.same(statusCode, 400);

  t.end();
});

test('api.perguntas.update: somente usuario que postou a pergunta pode editá-la', async t => {
  const fastify = await initServer(t);

  const usuario1 = await seed.entidades.usuario();
  const usuario2 = seed.fixtures.usuario();

  await seed.entidades.usuario(usuario2);
  const pergunta = await seed.entidades.pergunta({ usuarioId: usuario1._id });
  const alteracoes = { descricao: 'pergunta atualizado' };

  const cookie = await getCookie({ fastify, payload: { username: usuario2.username, password: usuario2.password } });

  const { statusCode, payload } = await fastify.inject({
    url: `/api/perguntas/${pergunta._id}`,
    method: 'POST',
    payload: alteracoes,
    headers: { cookie },
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Somente o usuário que postou a pergunta pode editá-la');
  t.same(statusCode, 401);

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

test('api.perguntas.search: pesquisa por tags', async t => {
  const fastify = await initServer(t);

  const { _id: usuarioId } = await seed.entidades.usuario();

  const perguntaData = seed.fixtures.pergunta({ usuarioId, tags: ['teste1', 'teste2'] });

  await fastify.core.models.pergunta.create(perguntaData);

  const filter = utils.serialize({ tags: ['teste1', 'teste2'] });

  const { statusCode, payload } = await fastify.inject({
    url: '/api/perguntas/search?' + filter,
    method: 'GET',
  });

  const { total } = JSON.parse(payload);

  t.same(statusCode, 200);
  t.same(total, 1);

  t.end();
});

test('api.perguntas.search: pesquisa por keyword', async t => {
  const fastify = await initServer(t);

  const keyword = 'titulo esotérico';

  await seed.entidades.pergunta({ titulo: 'um titulo esotérico aí' });

  const filter = utils.serialize({ keyword });

  const { statusCode, payload } = await fastify.inject({
    url: '/api/perguntas/search?' + filter,
    method: 'GET',
  });

  const { total } = JSON.parse(payload);

  t.same(statusCode, 200);
  t.same(total, 1);

  t.end();
});

test('api.perguntas.search: pesquisa sem filtro', async t => {
  const fastify = await initServer(t);

  await seed.entidades.pergunta();

  const { statusCode, payload } = await fastify.inject({
    url: '/api/perguntas/search?',
    method: 'GET',
  });

  const { total } = JSON.parse(payload);

  t.same(statusCode, 200);
  t.same(total, 0);

  t.end();
});

test('api.perguntas.trending', async t => {
  const fastify = await initServer(t);

  const titulos = ['titulo 2', 'titulo 3', 'titulo 1'];

  await seed.entidades.pergunta({ titulo: titulos[1], upvotes: 2, downvotes: 3 });
  await seed.entidades.pergunta({ titulo: titulos[0], upvotes: 3, downvotes: 3 });
  await seed.entidades.pergunta({ titulo: titulos[2], upvotes: 4, downvotes: 1 });

  const { statusCode, payload } = await fastify.inject({
    url: '/api/perguntas/trending',
    method: 'GET',
  });

  const { elements, total } = JSON.parse(payload);

  t.same(statusCode, 200);
  t.same(total, 3);
  elements.forEach(({ titulo }, index) => {
    t.same(titulo, titulos[index]);
  });

  t.end();
});

test('api.perguntas.trending: skip & limit', async t => {
  const fastify = await initServer(t);

  for (let i = 0; i < 10; i++) {
    await seed.entidades.pergunta({ titulo: `titulo ${i}`, upvotes: i });
  }

  const options = { skip: 2, limit: 4 };

  const { statusCode, payload } = await fastify.inject({
    url: `/api/perguntas/trending?${utils.serialize(options)}`,
    method: 'GET',
  });

  const { elements, total } = JSON.parse(payload);

  t.same(statusCode, 200);
  t.same(total, 4);

  const expectedTitulos = ['titulo 7', 'titulo 6', 'titulo 5', 'titulo 4'];

  elements.forEach(({ titulo }, index) => {
    t.same(titulo, expectedTitulos[index]);
  });

  t.end();
});
