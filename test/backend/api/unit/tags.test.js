'use strict';

const { test } = require('tap');

const { initServer, randomObjectId } = require('../../../test-helpers');
const seed = require('../../../../seed');

test('api.tags.pergunta', async t => {
  const fastify = await initServer(t);

  const tagNamesExpected = ['tag1', 'tag2', 'tag3'];

  const { _id: usuarioId } = await seed.entidades.usuario();
  const perguntaData = seed.fixtures.pergunta({ tags: tagNamesExpected, usuarioId });
  const pergunta = await fastify.core.models.pergunta.create(perguntaData);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/tags/pergunta/${pergunta._id}`,
    method: 'GET',
  });

  const { elements, total } = JSON.parse(payload);

  const foundTagNames = elements.map(({ nome }) => nome);

  t.same(statusCode, 200);
  t.same(total, 3);

  tagNamesExpected.forEach(tagNameExpected => {
    t.ok(foundTagNames.includes(tagNameExpected));
  });

  t.same(foundTagNames.length, tagNamesExpected.length);

  t.end();
});

test('api.tags.pergunta: passa id de uma pergunta não cadastrada', async t => {
  const fastify = await initServer(t);

  const { statusCode } = await fastify.inject({
    url: `/api/tags/pergunta/${randomObjectId()}`,
    method: 'GET',
  });

  t.same(statusCode, 404);

  t.end();
});
