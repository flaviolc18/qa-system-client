'use strict';

const PerguntaModel = require('./pergunta.model');

module.exports = async function(query) {
  const deletedPergunta = await PerguntaModel.findOneAndRemove(query);

  if (!deletedPergunta) {
    throw new Error('Pergunta não encontrada');
  }

  return deletedPergunta;
};
