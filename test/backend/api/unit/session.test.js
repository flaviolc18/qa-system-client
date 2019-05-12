'use strict';

const { test } = require('tap');

const { initServer } = require('../../../test-helpers');

test('api.session.find', async t => {
  const fastify = await initServer(t);

  const { statusCode } = await fastify.inject({
    url: '/api/session',
    method: 'GET',
  });

  t.same(statusCode, 404);

  t.end();
});

test('api.session.find', async t => {
  const fastify = await initServer(t);

  const userData = {
    username: 'Nome',
    email: 'teste@mail.com',
    password: 'senha',
    descricao: 'senha',
    reputacao: 0,
  };

  const { headers } = await fastify.inject({
    url: '/api/usuarios/signup',
    method: 'POST',
    payload: userData,
  });

  const { statusCode } = await fastify.inject({
    url: '/api/sessions',
    method: 'GET',
    headers: { cookie: headers['set-cookie'] },
  });

  t.same(statusCode, 200);

  t.end();
});
