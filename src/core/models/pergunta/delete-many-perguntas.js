'use strict';

const PerguntaModel = require('./pergunta.model');
const respostaModel = require('../resposta');
const votesModel = require('../votes');

module.exports = async function(query) {
  const perguntas = await PerguntaModel.find(query);
  const perguntasIds = perguntas.map(({ _id }) => _id);

  const deletedPerguntas = await PerguntaModel.deleteMany({ _id: { $in: perguntasIds } });

  await votesModel.deleteMany({ postId: deletedPerguntas._id });

  await respostaModel.deleteMany({ perguntaId: { $in: perguntasIds } });

  return deletedPerguntas;
};
