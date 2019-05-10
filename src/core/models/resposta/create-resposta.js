'use strict';

const findUsuario = require('../usuario/find-usuario');
const findPergunta = require('../pergunta/find-pergunta');

const RespostaModel = require('./resposta.model');

module.exports = async function(respostaData) {
  const usuario = await findUsuario({ _id: respostaData.usuarioId });

  if (!usuario) {
    throw new Error('Referência para usuário inválida');
  }

  const pergunta = await findPergunta({ _id: respostaData.perguntaId });

  if (!pergunta) {
    throw new Error('Referência para pergunta inválida');
  }
  const defaultValues = {
    dataCriacao: new Date(),
    downvotes: 0,
    upvotes: 0,
  };

  //FIXME: trocar ordem
  const resposta = new RespostaModel({ ...defaultValues, ...respostaData });

  return resposta.save();
};
