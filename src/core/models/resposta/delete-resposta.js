'use strict';

const RespostaModel = require('./resposta.model');

module.exports = async function(query) {
  const deletedResposta = await RespostaModel.findOneAndRemove(query);

  if (!deletedResposta) {
    throw new Error('Resposta não encontrada');
  }

  return deletedResposta;
};
