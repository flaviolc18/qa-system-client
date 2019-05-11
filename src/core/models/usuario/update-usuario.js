'use strict';

const UsuarioModel = require('./usuario.model');

module.exports = async function(query, changes) {
  const foundUsuario = await UsuarioModel.findOne(query);

  if (!foundUsuario) {
    throw new Error('Usuário não encontrado');
  }

  if (!changes.password) {
    return UsuarioModel.findOneAndUpdate(query, changes, { new: true });
  }

  const {
    _doc: { _id: usuarioId, ...usuarioData },
  } = foundUsuario;

  await UsuarioModel.findByIdAndRemove(usuarioId);

  const usuario = new UsuarioModel({ ...usuarioData, ...changes });

  return usuario.save();
};
