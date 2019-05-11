'use strict';

const { test } = require('tap');

const { initServer } = require('../../../test-helpers');

test('api.server: renderiza interface do app', async t => {
  const fastify = await initServer(t);

  const { statusCode } = await fastify.inject({
    url: '/',
    method: 'GET',
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.server: api deve retornar 404 quando receber url inválida', async t => {
  const fastify = await initServer(t);

  const { statusCode } = await fastify.inject({
    url: '/api/urlinvalida',
    method: 'GET',
  });

  t.same(statusCode, 404);

  t.end();
});
