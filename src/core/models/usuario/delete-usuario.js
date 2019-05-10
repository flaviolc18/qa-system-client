'use strict';

const UsuarioModel = require('./usuario.model');

module.exports = async function(query) {
  const deletedUsuario = await UsuarioModel.findOneAndRemove(query);

  if (!deletedUsuario) {
    throw new Error('Usuário não encontrado');
  }

  return deletedUsuario;
};
