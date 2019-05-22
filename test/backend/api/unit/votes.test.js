'use strict';

const { test } = require('tap');

const { initServer, randomObjectId } = require('../../../test-helpers');
const seed = require('../../../../seed');

test('api.votes.vote', async t => {
  const fastify = await initServer(t);

  const { _id: usuarioId } = await seed.entidades.usuario();
  const { _id: perguntaId } = await seed.entidades.pergunta({ usuarioId });

  const { statusCode } = await fastify.inject({
    url: `/api/posts/${perguntaId}/vote/${usuarioId}/1`,
    method: 'GET',
  });

  const perguntaAtualizada = await fastify.core.models.pergunta.find({ _id: perguntaId });

  t.same(statusCode, 200);
  t.same(perguntaAtualizada.vote, 1);

  t.end();
});

test('api.votes.vote: exception', async t => {
  const fastify = await initServer(t);

  const { _id: perguntaId } = await seed.entidades.pergunta();

  const { statusCode, payload } = await fastify.inject({
    url: `/api/posts/${perguntaId}/vote/${randomObjectId()}/1`,
    method: 'GET',
  });

  const { message } = JSON.parse(payload);

  t.same(statusCode, 400);
  t.same(message, 'Error: Referência para usuário inválida');

  t.end();
});

test('api.votes.unvote', async t => {
  const fastify = await initServer(t);

  const { _id: usuarioId } = await seed.entidades.usuario();
  const { _id: perguntaId } = await seed.entidades.pergunta({ usuarioId });

  await fastify.core.models.votes.vote({ postId: perguntaId, usuarioId, vote: 1 });

  const { statusCode } = await fastify.inject({
    url: `/api/posts/${perguntaId}/unvote/${usuarioId}`,
    method: 'GET',
  });

  const perguntaAtualizada = await fastify.core.models.pergunta.find({ _id: perguntaId });

  t.same(statusCode, 200);
  t.same(perguntaAtualizada.vote, 0);

  t.end();
});

test('api.votes.unvote: exception', async t => {
  const fastify = await initServer(t);

  const { _id: perguntaId } = await seed.entidades.pergunta();

  const { statusCode, payload } = await fastify.inject({
    url: `/api/posts/${perguntaId}/unvote/${randomObjectId()}`,
    method: 'GET',
  });

  const { message } = JSON.parse(payload);

  t.same(statusCode, 400);
  t.same(message, 'Error: Documento "Vote" não encontrado');

  t.end();
});
