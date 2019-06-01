'use strict';

const UsuarioModel = require('./usuario.model');

module.exports = function(query, options) {
  return UsuarioModel.find(query, null, options);
};
