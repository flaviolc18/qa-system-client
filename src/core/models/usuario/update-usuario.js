'use strict';

const UsuarioModel = require('./usuario.model');
const bcrypt = require('bcryptjs');
const { saltWorkFactor } = require('../../constants');

module.exports = async function(query, changes) {
  const foundUsuario = await UsuarioModel.findOne(query);

  if (!foundUsuario) {
    throw new Error('Usuário não encontrado');
  }

  if (!changes.password) {
    return UsuarioModel.findOneAndUpdate(query, changes, { new: true });
  }

  const salt = bcrypt.genSaltSync(saltWorkFactor);
  const hash = bcrypt.hashSync(changes.password, salt);

  const { password, ..._changes } = changes;
  const model = { ..._changes, password: hash };

  return UsuarioModel.findOneAndUpdate(query, model, { new: true });
};
