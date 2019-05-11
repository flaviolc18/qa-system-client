'use strict';

const findUsuario = require('../usuario/find-usuario');

const PerguntaModel = require('./pergunta.model');

module.exports = async function(perguntaData) {
  const usuario = await findUsuario({ _id: perguntaData.usuarioId });

  if (!usuario) {
    throw new Error('Referência para usuário inválida');
  }

  const defaultValues = {
    dataCriacao: new Date(),
    downvotes: 0,
    upvotes: 0,
  };

  //FIXME: trocar ordem
  const pergunta = new PerguntaModel({ ...defaultValues, ...perguntaData });

  return pergunta.save();
};
