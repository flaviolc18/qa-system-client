'use strict';

const { test } = require('tap');

const { initServer, randomObjectId } = require('../../../test-helpers');
const seed = require('../../../../seed');

test('api.usuarios.signup', async t => {
  const fastify = await initServer(t);

  const usuarioData = seed.fixtures.usuario();

  const { statusCode } = await fastify.inject({
    url: '/api/usuarios/signup',
    method: 'POST',
    payload: usuarioData,
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.usuarios.changePassword', async t => {
  const fastify = await initServer(t);

  const usuario = await seed.entidades.usuario();

  const { statusCode } = await fastify.inject({
    url: `/api/usuarios/change-password/${usuario._id}`,
    method: 'POST',
    payload: { password: 'passwordTeste123', newPassword: 'passwordTeste1234' },
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.usuarios.changePassword: tenta alterar senha de um usuário inexistente', async t => {
  const fastify = await initServer(t);

  const { statusCode } = await fastify.inject({
    url: `/api/usuarios/change-password/${randomObjectId()}`,
    method: 'POST',
    payload: { password: 'passwordTeste123', newPassword: 'passwordTeste1234' },
  });

  t.same(statusCode, 404);

  t.end();
});

test('api.usuarios.changePassword: tenta alterar senha passando uma senha atual incorreta', async t => {
  const fastify = await initServer(t);

  const usuario = await seed.entidades.usuario({ password: 'passwordCorreta' });

  const { statusCode, payload } = await fastify.inject({
    url: `/api/usuarios/change-password/${usuario._id}`,
    method: 'POST',
    payload: { password: 'passwordIncorreta', newPassword: 'passwordTeste1234' },
  });

  const { message } = JSON.parse(payload);

  t.same(statusCode, 401);
  t.same(message, 'Senha incorreta');

  t.end();
});

test('api.usuarios.delete', async t => {
  const fastify = await initServer(t);

  const usuario = await seed.entidades.usuario();
  const { statusCode } = await fastify.inject({
    url: `/api/usuarios/${usuario._id}`,
    method: 'DELETE',
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.usuarios.delete: passa id inválido', async t => {
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

test('api.usuarios.findAll', async t => {
  const fastify = await initServer(t);

  await seed.entidades.usuario({ nome: 'usuario 1' });
  await seed.entidades.usuario({ nome: 'usuario 2' });

  const { statusCode } = await fastify.inject({
    url: '/api/usuarios',
    method: 'GET',
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.usuarios.find', async t => {
  const fastify = await initServer(t);

  const usuario = await seed.entidades.usuario();

  const { statusCode } = await fastify.inject({
    url: `/api/usuarios/${usuario._id}`,
    method: 'GET',
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.usuarios.find: passa id inválido', async t => {
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

test('api.usuarios.update', async t => {
  const fastify = await initServer(t);

  const usuario = await seed.entidades.usuario();
  const alteracoes = { username: 'usuarioAtualizado' };

  const { statusCode } = await fastify.inject({
    url: `/api/usuarios/${usuario._id}`,
    method: 'POST',
    payload: alteracoes,
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.usuarios.update: passa id inválido', async t => {
  const fastify = await initServer(t);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/usuarios/${randomObjectId()}`,
    method: 'POST',
    payload: {},
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Usuário não encontrado');
  t.same(statusCode, 404);

  t.end();
});

test('api.usuarios.update: tenta alterar senha', async t => {
  const fastify = await initServer(t);

  const usuario = await seed.entidades.usuario();
  const alteracoes = { password: 'novaSenha' };

  const { statusCode, payload } = await fastify.inject({
    url: `/api/usuarios/${usuario._id}`,
    method: 'POST',
    payload: alteracoes,
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Não é possível alterar senha por esta API');
  t.same(statusCode, 400);

  t.end();
});

for (const loginMethod of ['username', 'email']) {
  test(`api.usuarios.login: loga por ${loginMethod}`, async t => {
    const fastify = await initServer(t);

    const usuarioData = seed.fixtures.usuario();

    await seed.entidades.usuario(usuarioData);

    const { statusCode } = await fastify.inject({
      url: '/api/usuarios/login',
      method: 'POST',
      payload: { [loginMethod]: usuarioData[loginMethod], password: usuarioData.password },
    });

    t.same(statusCode, 200);

    t.end();
  });
}

test('api.usuarios.login: tenta logar com username inválido', async t => {
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

test('api.usuarios.login: tenta logar com senha inválida', async t => {
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

test('api.usuarios.logout', async t => {
  const fastify = await initServer(t);

  const usuarioData = seed.fixtures.usuario();

  const { statusCode: statusCode1, headers } = await fastify.inject({
    url: '/api/usuarios/signup',
    method: 'POST',
    payload: usuarioData,
  });

  t.same(statusCode1, 200);

  const { statusCode } = await fastify.inject({
    url: '/api/usuarios/logout',
    method: 'DELETE',
    headers: { cookie: headers['set-cookie'] },
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.usuarios.logout: tenta fazer logout com session inválida', async t => {
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

test('api.usuarios.perguntas', async t => {
  const fastify = await initServer(t);

  const usuario = await seed.entidades.usuario();
  const pergunta = await seed.entidades.pergunta({ usuarioId: usuario._id });

  const { statusCode } = await fastify.inject({
    url: `/api/usuarios/perguntas/${pergunta._id}`,
    method: 'GET',
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.usuarios.perguntas: passa id inválido', async t => {
  const fastify = await initServer(t);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/usuarios/perguntas/${randomObjectId()}`,
    method: 'GET',
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Not Found');
  t.same(statusCode, 404);

  t.end();
});

test('api.usuarios.respostas', async t => {
  const fastify = await initServer(t);

  const usuario = await seed.entidades.usuario();
  const resposta = await seed.entidades.resposta({ usuarioId: usuario._id });

  const { statusCode } = await fastify.inject({
    url: `/api/usuarios/respostas/${resposta._id}`,
    method: 'GET',
  });

  t.same(statusCode, 200);

  t.end();
});

test('api.usuarios.respostas: passa id inválido', async t => {
  const fastify = await initServer(t);

  const { statusCode, payload } = await fastify.inject({
    url: `/api/usuarios/respostas/${randomObjectId()}`,
    method: 'GET',
  });

  const { message } = JSON.parse(payload);

  t.same(message, 'Not Found');
  t.same(statusCode, 404);

  t.end();
});
