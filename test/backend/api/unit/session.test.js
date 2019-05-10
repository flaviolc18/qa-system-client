'use strict';

const { skip } = require('tap');

const { initServer } = require('../test-helpers');
const seed = require('../../seed');

skip('api.sessions.find', async t => {
  const fastify = await initServer(t);

  const usuarioData = seed.fixtures.usuario();

  const { headers } = await fastify.inject({
    url: '/api/usuarios/signup',
    method: 'POST',
    payload: usuarioData,
  });
  const parsedSessionId = headers['set-cookie'].slice(8, 32);

  const { statusCode, payload } = await fastify.inject({
    url: '/api/sessions',
    method: 'GET',
    headers: { cookie: headers['set-cookie'] },
  });

  const { _id: foundSessionId } = JSON.parse(payload);

  t.strictSame(foundSessionId, parsedSessionId);
  t.same(statusCode, 200);

  t.end();
});

skip('api.sessions.find: sem session pré-cadastrada', async t => {
  const fastify = await initServer(t);

  const { statusCode, payload } = await fastify.inject({
    url: '/api/sessions',
    method: 'GET',
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Not Found');
  t.same(statusCode, 404);

  t.end();
});
