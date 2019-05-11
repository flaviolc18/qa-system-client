'use strict';

const { skip } = require('tap');

const { initServer, randomObjectId, isValidObjectId, convertObjectIdsToString } = require('../../../test-helpers');
const seed = require('../../../../seed');

skip('api.respostas.create', async t => {
  const fastify = await initServer(t);

  const { _id: usuarioId } = await seed.entidades.usuario();

  const { _id: perguntaId } = await seed.entidades.pergunta({ usuarioId });

  const respostaData = seed.fixtures.resposta({ usuarioId: usuarioId.toString(), perguntaId: perguntaId.toString() });

  const { statusCode, payload } = await fastify.inject({
    url: '/api/respostas',
    method: 'POST',
    payload: respostaData,
  });

  const { _id: respostaId, ...createdResposta } = JSON.parse(payload);

  t.strictSame(createdResposta, respostaData);
  t.ok(isValidObjectId(respostaId));
  t.same(statusCode, 200);

  t.end();
});

skip('api.respostas.create: cadastra com referência para usuário inválida', async t => {
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

skip('api.respostas.create: cadastra com referência para pergunta inválida', async t => {
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

skip('api.respostas.delete', async t => {
  const fastify = await initServer(t);

  const resposta = await seed.entidades.resposta();
  const parsedResposta = convertObjectIdsToString(resposta);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/respostas/${resposta._id}`,
    method: 'DELETE',
  });

  const deletedResposta = JSON.parse(payload);

  const respostas = await fastify.core.models.resposta.findAll();

  t.strictSame(deletedResposta, parsedResposta);
  t.same(respostas, []);
  t.same(statusCode, 200);

  t.end();
});

skip('api.respostas.delete: passa id inválido', async t => {
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

skip('api.respostas.findAll', async t => {
  const fastify = await initServer(t);

  const resposta1 = await seed.entidades.resposta({ nome: 'resposta 1' });
  const resposta2 = await seed.entidades.resposta({ nome: 'resposta 2' });

  const respostas = [convertObjectIdsToString(resposta1), convertObjectIdsToString(resposta2)];

  const { statusCode, payload } = await fastify.inject({
    url: '/api/respostas',
    method: 'GET',
  });

  const foundRespostas = JSON.parse(payload);

  t.strictSame(foundRespostas, respostas);

  t.same(statusCode, 200);

  t.end();
});

skip('api.respostas.find', async t => {
  const fastify = await initServer(t);

  const resposta = await seed.entidades.resposta();
  const parsedResposta = convertObjectIdsToString(resposta);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/respostas/${resposta._id}`,
    method: 'GET',
  });

  const foundResposta = JSON.parse(payload);

  t.strictSame(foundResposta, parsedResposta);
  t.same(statusCode, 200);

  t.end();
});

skip('api.respostas.find: passa id inválido', async t => {
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

skip('api.respostas.update', async t => {
  const fastify = await initServer(t);

  const resposta = await seed.entidades.resposta();
  const parsedResposta = convertObjectIdsToString(resposta);
  const alteracoes = { descricao: 'resposta atualizado' };

  const { statusCode, payload } = await fastify.inject({
    url: `/api/respostas/${resposta._id}`,
    method: 'POST',
    payload: alteracoes,
  });

  const updatedResposta = JSON.parse(payload);

  t.strictSame(updatedResposta, { ...parsedResposta, ...alteracoes });
  t.same(statusCode, 200);

  t.end();
});

skip('api.respostas.update: passa id inválido', async t => {
  const fastify = await initServer(t);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/respostas/${randomObjectId()}`,
    method: 'POST',
    payload: {},
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Resposta não encontrada');
  t.same(statusCode, 400);

  t.end();
});
