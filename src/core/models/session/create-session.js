'use strict';

const SessionModel = require('./session.model');
const { sessionExpirationTimeInDays } = require('../../../utils');
const findUsuario = require('../usuario/find-usuario');

module.exports = async function(usuarioId) {
  const usuario = await findUsuario({ _id: usuarioId });

  if (!usuario) {
    throw new Error('Referência para usuário inválida');
  }

  const dataCriacao = new Date();
  const dataExpiracao = new Date();

  dataExpiracao.setDate(dataCriacao.getDate() + sessionExpirationTimeInDays);

  const session = new SessionModel({
    usuarioId,
    dataCriacao,
    dataExpiracao,
  });

  return session.save();
};
