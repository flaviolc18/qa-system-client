'use strict';

const PerguntaModel = require('./pergunta.model');
const RespostaModel = require('../resposta/resposta.model');

module.exports = async function(query) {
  const deletedPergunta = await PerguntaModel.findOneAndRemove(query);

  if (!deletedPergunta) {
    throw new Error('Pergunta não encontrada');
  }

  await RespostaModel.deleteMany({ perguntaId: deletedPergunta._id });

  return deletedPergunta;
};
