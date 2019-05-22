'use strict';

const { test } = require('tap');

const { initServer } = require('../../../test-helpers');
const seed = require('../../../../seed');

const getCookie = async ({ fastify, payload }) => {
  const { headers } = await fastify.inject({
    url: '/api/usuarios/login',
    method: 'POST',
    payload,
  });

  return headers['set-cookie'];
};

test('api.votes.upvote', async t => {
  const fastify = await initServer(t);

  const usuario = seed.fixtures.usuario();
  const { _id: usuarioId } = await seed.entidades.usuario(usuario);
  const { _id: perguntaId } = await seed.entidades.pergunta({ usuarioId });
  const cookie = await getCookie({ fastify, payload: { username: usuario.username, password: usuario.password } });

  const { statusCode } = await fastify.inject({
    url: `/api/posts/${perguntaId}/upvote`,
    method: 'GET',
    headers: { cookie },
  });

  const perguntaAtualizada = await fastify.core.models.pergunta.find({ _id: perguntaId });

  t.same(statusCode, 200);
  t.same(perguntaAtualizada.upvotes, 1);

  t.end();
});

test('api.votes.upvote: exception', async t => {
  const fastify = await initServer(t);

  const { _id: perguntaId } = await seed.entidades.pergunta();

  const { statusCode, payload } = await fastify.inject({
    url: `/api/posts/${perguntaId}/upvote`,
    method: 'GET',
  });

  const { message } = JSON.parse(payload);

  t.same(statusCode, 400);
  t.same(message, 'Error: Referência para usuário inválida');

  t.end();
});

test('api.votes.downvote', async t => {
  const fastify = await initServer(t);

  const usuario = seed.fixtures.usuario();
  const { _id: usuarioId } = await seed.entidades.usuario(usuario);
  const { _id: perguntaId } = await seed.entidades.pergunta({ usuarioId });
  const cookie = await getCookie({ fastify, payload: { username: usuario.username, password: usuario.password } });

  const { statusCode } = await fastify.inject({
    url: `/api/posts/${perguntaId}/downvote`,
    method: 'GET',
    headers: { cookie },
  });

  const perguntaAtualizada = await fastify.core.models.pergunta.find({ _id: perguntaId });

  t.same(statusCode, 200);
  t.same(perguntaAtualizada.downvotes, 1);

  t.end();
});

test('api.votes.downvote: exception', async t => {
  const fastify = await initServer(t);

  const { _id: perguntaId } = await seed.entidades.pergunta();

  const { statusCode, payload } = await fastify.inject({
    url: `/api/posts/${perguntaId}/downvote`,
    method: 'GET',
  });

  const { message } = JSON.parse(payload);

  t.same(statusCode, 400);
  t.same(message, 'Error: Referência para usuário inválida');

  t.end();
});

test('api.votes.unvote', async t => {
  const fastify = await initServer(t);

  const usuario = seed.fixtures.usuario();
  const { _id: usuarioId } = await seed.entidades.usuario(usuario);
  const { _id: perguntaId } = await seed.entidades.pergunta({ usuarioId });
  const cookie = await getCookie({ fastify, payload: { username: usuario.username, password: usuario.password } });

  await fastify.core.models.votes.upvote({ postId: perguntaId, usuarioId });

  const { statusCode } = await fastify.inject({
    url: `/api/posts/${perguntaId}/unvote`,
    method: 'GET',
    headers: { cookie },
  });

  const perguntaAtualizada = await fastify.core.models.pergunta.find({ _id: perguntaId });

  t.same(statusCode, 200);
  t.same(perguntaAtualizada.upvotes, 0);

  t.end();
});

test('api.votes.unvote: exception', async t => {
  const fastify = await initServer(t);

  const { _id: perguntaId } = await seed.entidades.pergunta();

  const { statusCode, payload } = await fastify.inject({
    url: `/api/posts/${perguntaId}/unvote`,
    method: 'GET',
  });

  const { message } = JSON.parse(payload);

  t.same(statusCode, 400);
  t.same(message, 'Error: Documento "Vote" não encontrado');

  t.end();
});
