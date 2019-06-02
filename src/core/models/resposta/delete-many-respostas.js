'use strict';

const RespostaModel = require('./resposta.model');
const votesModel = require('../votes');

module.exports = async function(query) {
  const respostas = await RespostaModel.find(query);
  const respostasIds = respostas.map(({ _id }) => _id);

  const deletedRespostas = await RespostaModel.deleteMany({ _id: { $in: respostasIds } });

  await votesModel.deleteMany({ postId: { $in: respostasIds } });

  return deletedRespostas;
};
