'use strict';

const RespostaModel = require('./resposta.model');

module.exports = async function(query, changes) {
  if (changes.usuarioId) {
    throw new Error('Referência de usuário da resposta não deve ser alterada');
  }

  if (changes.perguntaId) {
    throw new Error('Referência de pergunta associada à resposta não deve ser alterada');
  }

  const updatedResposta = await RespostaModel.findOneAndUpdate(query, changes, { new: true });

  if (!updatedResposta) {
    throw new Error('Resposta não encontrada');
  }

  return updatedResposta;
};
