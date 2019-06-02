'use strict';

const PerguntaModel = require('./pergunta.model');
const deleteManyRespostas = require('../resposta/delete-many-respostas');
const votesModel = require('../votes');

module.exports = async function(query) {
  const deletedPergunta = await PerguntaModel.findOneAndRemove(query);

  if (!deletedPergunta) {
    throw new Error('Pergunta não encontrada');
  }

  await votesModel.deleteMany({ postId: deletedPergunta._id });

  await deleteManyRespostas({ perguntaId: deletedPergunta._id });

  return deletedPergunta;
};
