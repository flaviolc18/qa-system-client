'use strict';

const { skip } = require('tap');

const { initServer, randomObjectId, isValidObjectId, convertObjectIdsToString } = require('../../../test-helpers');
const seed = require('../../../../seed');

skip('api.usuarios.signup', async t => {
  const fastify = await initServer(t);

  const usuarioData = seed.fixtures.usuario();
  const { password: _, ...usuarioDataWithoutPass } = usuarioData;

  const { statusCode, payload } = await fastify.inject({
    url: '/api/usuarios/signup',
    method: 'POST',
    payload: usuarioData,
  });

  const { _id: usuarioId, password, ...createdUsuario } = JSON.parse(payload);

  t.strictSame(createdUsuario, usuarioDataWithoutPass);
  t.ok(isValidObjectId(usuarioId));
  t.same(statusCode, 200);

  t.end();
});

skip('api.usuarios.delete', async t => {
  const fastify = await initServer(t);

  const usuario = await seed.entidades.usuario();
  const parsedUsuario = convertObjectIdsToString(usuario);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/usuarios/${usuario._id}`,
    method: 'DELETE',
  });

  const deletedUsuario = JSON.parse(payload);

  const usuarios = await fastify.core.models.usuario.findAll();

  t.strictSame(deletedUsuario, parsedUsuario);
  t.same(usuarios, []);
  t.same(statusCode, 200);

  t.end();
});

skip('api.usuarios.delete: passa id inválido', async t => {
  const fastify = await initServer(t);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/usuarios/${randomObjectId()}`,
    method: 'DELETE',
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Not Found');
  t.same(statusCode, 404);

  t.end();
});

skip('api.usuarios.findAll', async t => {
  const fastify = await initServer(t);

  const usuario1 = await seed.entidades.usuario({ nome: 'usuario 1' });
  const usuario2 = await seed.entidades.usuario({ nome: 'usuario 2' });

  const usuarios = [convertObjectIdsToString(usuario1), convertObjectIdsToString(usuario2)];

  const { statusCode, payload } = await fastify.inject({
    url: '/api/usuarios',
    method: 'GET',
  });

  const foundUsuario = JSON.parse(payload);

  t.strictSame(foundUsuario, usuarios);

  t.same(statusCode, 200);

  t.end();
});

skip('api.usuarios.find', async t => {
  const fastify = await initServer(t);

  const usuario = await seed.entidades.usuario();
  const parsedUsuario = convertObjectIdsToString(usuario);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/usuarios/${usuario._id}`,
    method: 'GET',
  });

  const foundUsuario = JSON.parse(payload);

  t.strictSame(foundUsuario, parsedUsuario);
  t.same(statusCode, 200);

  t.end();
});

skip('api.usuarios.find: passa id inválido', async t => {
  const fastify = await initServer(t);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/usuarios/${randomObjectId()}`,
    method: 'GET',
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Not Found');
  t.same(statusCode, 404);

  t.end();
});

skip('api.usuarios.update', async t => {
  const fastify = await initServer(t);

  const usuario = await seed.entidades.usuario();
  const parsedUsuario = convertObjectIdsToString(usuario);
  const alteracoes = { username: 'usuarioAtualizado' };

  const { statusCode, payload } = await fastify.inject({
    url: `/api/usuarios/${usuario._id}`,
    method: 'POST',
    payload: alteracoes,
  });

  const updatedUsuario = JSON.parse(payload);

  t.strictSame(updatedUsuario, { ...parsedUsuario, ...alteracoes });
  t.same(statusCode, 200);

  t.end();
});

skip('api.usuarios.update: passa id inválido', async t => {
  const fastify = await initServer(t);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/usuarios/${randomObjectId()}`,
    method: 'POST',
    payload: {},
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Not Found');
  t.same(statusCode, 404);

  t.end();
});

for (const loginMethod of ['username', 'email']) {
  skip(`api.usuarios.login: loga por ${loginMethod}`, async t => {
    const fastify = await initServer(t);

    const usuarioData = seed.fixtures.usuario();
    const createdUsuario = await seed.entidades.usuario(usuarioData);
    const parsedUsuario = convertObjectIdsToString(createdUsuario);

    const { statusCode, payload } = await fastify.inject({
      url: '/api/usuarios/login',
      method: 'POST',
      payload: { [loginMethod]: usuarioData[loginMethod], password: usuarioData.password },
    });

    const foundUsuario = JSON.parse(payload);

    t.strictSame(foundUsuario, parsedUsuario);
    t.same(statusCode, 200);

    t.end();
  });
}

skip('api.usuarios.login: tenta logar com username inválido', async t => {
  const fastify = await initServer(t);

  const { statusCode, payload } = await fastify.inject({
    url: '/api/usuarios/login',
    method: 'POST',
    payload: { username: 'invalido', password: 'invalida' },
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Not Found');
  t.same(statusCode, 404);

  t.end();
});

skip('api.usuarios.login: tenta logar com senha inválida', async t => {
  const fastify = await initServer(t);

  const createdUsuario = await seed.entidades.usuario();

  const { statusCode, payload } = await fastify.inject({
    url: '/api/usuarios/login',
    method: 'POST',
    payload: { username: createdUsuario.username, password: 'invalida' },
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Unauthorized');
  t.same(statusCode, 401);

  t.end();
});

skip('api.usuarios.logout', async t => {
  const fastify = await initServer(t);

  const usuarioData = seed.fixtures.usuario();

  const { statusCode: statusCode1, headers } = await fastify.inject({
    url: '/api/usuarios/signup',
    method: 'POST',
    payload: usuarioData,
  });

  t.same(statusCode1, 200);

  const parsedSessionId = headers['set-cookie'].slice(8, 32);

  const { statusCode, payload } = await fastify.inject({
    url: '/api/usuarios/logout',
    method: 'DELETE',
    headers: { cookie: headers['set-cookie'] },
  });

  const { _id: sessionId } = JSON.parse(payload);

  t.strictSame(sessionId, parsedSessionId);
  t.same(statusCode, 200);

  t.end();
});

skip('api.usuarios.logout: tenta fazer logout com session inválida', async t => {
  const fastify = await initServer(t);

  const { statusCode, payload } = await fastify.inject({
    url: '/api/usuarios/logout',
    method: 'DELETE',
    headers: { cookie: 'invalida' },
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Not Found');
  t.same(statusCode, 404);

  t.end();
});
