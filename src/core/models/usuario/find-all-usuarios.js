'use strict';

const UsuarioModel = require('./usuario.model');

module.exports = function(query) {
  return UsuarioModel.find(query);
};
