'use strict';

const UsuarioModel = require('../../src/core/models/usuario/usuario.model');
const usuarioFixture = require('../fixtures/usuario.fixture');

module.exports = async dadosUsuario => {
  dadosUsuario = usuarioFixture(dadosUsuario);
  const usuario = new UsuarioModel(dadosUsuario);

  const {
    _doc: { __v, ...createdUsuario },
  } = await usuario.save();

  return createdUsuario;
};
