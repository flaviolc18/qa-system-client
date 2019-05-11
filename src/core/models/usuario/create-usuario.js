'use strict';

const UsuarioModel = require('./usuario.model');

module.exports = function(usuarioData) {
  const usuario = new UsuarioModel(usuarioData);

  return usuario.save();
};
