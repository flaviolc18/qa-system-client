'use strict';

const { skip } = require('tap');

const { initServer, randomObjectId, isValidObjectId, convertObjectIdsToString } = require('../../../test-helpers');
const seed = require('../../../../seed');

skip('api.perguntas.create', async t => {
  const fastify = await initServer(t);

  const { _id: usuarioId } = await seed.entidades.usuario();

  const perguntaData = seed.fixtures.pergunta({ usuarioId: usuarioId.toString() });

  const { statusCode, payload } = await fastify.inject({
    url: '/api/perguntas',
    method: 'POST',
    payload: perguntaData,
  });

  const { _id: perguntaId, ...createdPergunta } = JSON.parse(payload);

  t.strictSame(createdPergunta, perguntaData);
  t.ok(isValidObjectId(perguntaId));
  t.same(statusCode, 200);

  t.end();
});

skip('api.perguntas.create: cadastra com referência para usuário inválida', async t => {
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

skip('api.perguntas.delete', async t => {
  const fastify = await initServer(t);

  const pergunta = await seed.entidades.pergunta();
  const parsedPergunta = convertObjectIdsToString(pergunta);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/perguntas/${pergunta._id}`,
    method: 'DELETE',
  });

  const deletedPergunta = JSON.parse(payload);

  const perguntas = await fastify.core.models.pergunta.findAll();

  t.strictSame(deletedPergunta, parsedPergunta);
  t.same(perguntas, []);
  t.same(statusCode, 200);

  t.end();
});

skip('api.perguntas.delete: passa id inválido', async t => {
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

skip('api.perguntas.findAll', async t => {
  const fastify = await initServer(t);

  const pergunta1 = await seed.entidades.pergunta({ nome: 'pergunta 1' });
  const pergunta2 = await seed.entidades.pergunta({ nome: 'pergunta 2' });

  const perguntas = [convertObjectIdsToString(pergunta1), convertObjectIdsToString(pergunta2)];

  const { statusCode, payload } = await fastify.inject({
    url: '/api/perguntas',
    method: 'GET',
  });

  const foundPerguntas = JSON.parse(payload);

  t.strictSame(foundPerguntas, perguntas);

  t.same(statusCode, 200);

  t.end();
});

skip('api.perguntas.find', async t => {
  const fastify = await initServer(t);

  const pergunta = await seed.entidades.pergunta();
  const parsedPergunta = convertObjectIdsToString(pergunta);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/perguntas/${pergunta._id}`,
    method: 'GET',
  });

  const foundPergunta = JSON.parse(payload);

  t.strictSame(foundPergunta, parsedPergunta);
  t.same(statusCode, 200);

  t.end();
});

skip('api.perguntas.find: passa id inválido', async t => {
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

skip('api.perguntas.update', async t => {
  const fastify = await initServer(t);

  const pergunta = await seed.entidades.pergunta();
  const parsedPergunta = convertObjectIdsToString(pergunta);
  const alteracoes = { descricao: 'pergunta atualizado' };

  const { statusCode, payload } = await fastify.inject({
    url: `/api/perguntas/${pergunta._id}`,
    method: 'POST',
    payload: alteracoes,
  });

  const updatedPergunta = JSON.parse(payload);

  t.strictSame(updatedPergunta, { ...parsedPergunta, ...alteracoes });
  t.same(statusCode, 200);

  t.end();
});

skip('api.perguntas.update: passa id inválido', async t => {
  const fastify = await initServer(t);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/perguntas/${randomObjectId()}`,
    method: 'POST',
    payload: {},
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Pergunta não encontrada');
  t.same(statusCode, 400);

  t.end();
});

skip('api.perguntas.findRespostas', async t => {
  const fastify = await initServer(t);

  const pergunta = await seed.entidades.pergunta();
  const resposta = await seed.entidades.resposta({ perguntaId: pergunta._id });
  const parsedResposta = convertObjectIdsToString(resposta);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/perguntas/${pergunta._id}/respostas`,
    method: 'GET',
  });

  const foundRespostas = JSON.parse(payload);

  t.strictSame(foundRespostas[0], parsedResposta);
  t.same(statusCode, 200);

  t.end();
});

skip('api.perguntas.findRespostas: passa id inválido', async t => {
  const fastify = await initServer(t);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/perguntas/${randomObjectId()}/respostas`,
    method: 'GET',
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Not Found');
  t.same(statusCode, 404);

  t.end();
});

skip('api.perguntas.findUsuario', async t => {
  const fastify = await initServer(t);

  const usuario = await seed.entidades.usuario();
  const pergunta = await seed.entidades.pergunta({ usuarioId: usuario._id });
  const parsedUsuario = convertObjectIdsToString(usuario);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/perguntas/${pergunta._id}/usuario`,
    method: 'GET',
  });

  const foundUsuario = JSON.parse(payload);

  t.strictSame(foundUsuario, parsedUsuario);
  t.same(statusCode, 200);

  t.end();
});

skip('api.perguntas.findUsuario: passa id inválido', async t => {
  const fastify = await initServer(t);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/perguntas/${randomObjectId()}/usuario`,
    method: 'GET',
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Not Found');
  t.same(statusCode, 404);

  t.end();
});

skip('api.perguntas.findUsuariosRespostas', async t => {
  const fastify = await initServer(t);

  const usuario = await seed.entidades.usuario();
  const pergunta = await seed.entidades.pergunta({ usuarioId: usuario._id });

  await seed.entidades.resposta({ perguntaId: pergunta._id, usuarioId: usuario._id });

  const parsedUsuarios = convertObjectIdsToString(usuario);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/perguntas/${pergunta._id}/respostas/usuarios`,
    method: 'GET',
  });

  const foundUsuarios = JSON.parse(payload);

  t.strictSame(foundUsuarios[0], parsedUsuarios);
  t.same(statusCode, 200);

  t.end();
});

skip('api.perguntas.findUsuariosRespostas: passa id inválido', async t => {
  const fastify = await initServer(t);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/perguntas/${randomObjectId()}/respostas/usuarios`,
    method: 'GET',
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Not Found');
  t.same(statusCode, 404);

  t.end();
});
