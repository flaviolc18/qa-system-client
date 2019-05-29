'use strict';

const { test } = require('tap');

const { withDB, randomObjectId } = require('../../test-helpers');
const seed = require('../../../seed');

const usuarioModel = require('../../../src/core/models/usuario');

test(
  'model.usuario.create',
  withDB(async t => {
    const usuarioData = seed.fixtures.usuario();
    const { password: rawPassword, ...usuarioDataWithoutPass } = usuarioData;

    const usuario = await usuarioModel.create(usuarioData);
    const {
      _doc: { _id, __v, password, ...createdUsuario },
    } = usuario;

    t.strictSame(createdUsuario, usuarioDataWithoutPass);

    t.ok(await usuario.comparePassword(rawPassword));

    t.end();
  })
);

test(
  'model.usuario.find',
  withDB(async t => {
    const usuario = await seed.entidades.usuario();

    const {
      _doc: { __v, ...foundUsuario },
    } = await usuarioModel.find({ _id: usuario._id });

    t.strictSame(foundUsuario, usuario);

    t.end();
  })
);

test(
  'model.usuario.update',
  withDB(async t => {
    const usuario = await seed.entidades.usuario();
    const alteracoes = { username: 'teste2' };

    const {
      _doc: { __v, ...updatedUsuario },
    } = await usuarioModel.update({ _id: usuario._id }, alteracoes);

    usuario.username = alteracoes.username;

    t.strictSame(updatedUsuario, usuario);

    t.end();
  })
);

test(
  'model.usuario.update: altera senha',
  withDB(async t => {
    const usuario = await seed.entidades.usuario();
    const alteracoes = { password: 'outraSenha' };

    const updatedUsuario = await usuarioModel.update({ _id: usuario._id }, alteracoes);

    const foundUsuarios = await usuarioModel.findAll();

    t.ok(await updatedUsuario.comparePassword(alteracoes.password));
    t.same(foundUsuarios.length, 1);

    t.end();
  })
);

test(
  'model.usuario.update: usuário inexistente',
  withDB(async t => {
    const alteracoes = { username: 'teste2' };

    try {
      await usuarioModel.update({ _id: randomObjectId() }, alteracoes);
    } catch ({ message }) {
      t.strictSame(message, 'Usuário não encontrado');
    }

    t.end();
  })
);

test(
  'model.usuario.findAll',
  withDB(async t => {
    const usuario = await seed.entidades.usuario();

    const foundUsuarios = await usuarioModel.findAll();
    const {
      _doc: { __v, ...foundUsuario },
    } = foundUsuarios[0];

    t.strictSame(foundUsuario, usuario);
    t.strictSame(foundUsuarios.length, 1);

    t.end();
  })
);

test(
  'model.usuario.delete',
  withDB(async t => {
    const usuario = await seed.entidades.usuario();

    const {
      _doc: { __v, ...deletedUsuario },
    } = await usuarioModel.delete({ _id: usuario._id });

    const foundUsuarios = await usuarioModel.findAll();

    t.strictSame(deletedUsuario, usuario);
    t.strictSame(foundUsuarios.length, 0);

    t.end();
  })
);

test(
  'model.usuario.comparePassword',
  withDB(async t => {
    const usuarioData = seed.fixtures.usuario();

    const usuario = await usuarioModel.create(usuarioData);

    t.ok(await usuario.comparePassword(usuarioData.password));

    t.end();
  })
);
