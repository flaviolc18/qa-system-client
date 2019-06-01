'use strict';

const { test } = require('tap');

const { initServer, randomObjectId } = require('../../../test-helpers');

test('api.imagem.find', async t => {
  const fastify = await initServer(t);

  const { payload } = await fastify.inject({
    url: '/api/imagem',
    method: 'POST',
    payload: { nome: 'teste', data: 'data' },
  });

  const { elements } = JSON.parse(payload);

  const { statusCode } = await fastify.inject({
    url: '/api/imagem/' + elements[0]._id,
    method: 'GET',
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.imagem.find', async t => {
  const fastify = await initServer(t);

  const { payload } = await fastify.inject({
    url: '/api/imagem/nome/a',
    method: 'GET',
  });
  const { message, statusCode } = JSON.parse(payload);

  t.same(message, 'Not Found');
  t.same(statusCode, 404);

  t.end();
});

test('api.imagem.find', async t => {
  const fastify = await initServer(t);

  const { payload } = await fastify.inject({
    url: '/api/imagem/' + randomObjectId(),
    method: 'GET',
  });

  const { message, statusCode } = JSON.parse(payload);

  t.same(message, 'Not Found');
  t.same(statusCode, 404);

  t.end();
});

test('api.imagem.delete', async t => {
  const fastify = await initServer(t);

  const { payload } = await fastify.inject({
    url: '/api/imagem',
    method: 'POST',
    payload: { nome: 'teste', data: 'data' },
  });

  const { elements } = JSON.parse(payload);

  const { statusCode } = await fastify.inject({
    url: '/api/imagem/' + elements[0]._id,
    method: 'DELETE',
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.imagem.delete', async t => {
  const fastify = await initServer(t);

  const { statusCode, payload } = await fastify.inject({
    url: '/api/imagem/' + randomObjectId(),
    method: 'DELETE',
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Not Found');
  t.same(statusCode, 404);

  t.end();
});
