'use strict';

const RespostaModel = require('./resposta.model');
const votesModel = require('../votes');

module.exports = async function(query) {
  const deletedResposta = await RespostaModel.findOneAndRemove(query);

  if (!deletedResposta) {
    throw new Error('Resposta não encontrada');
  }

  await votesModel.deleteMany({ postId: deletedResposta._id });

  return deletedResposta;
};
