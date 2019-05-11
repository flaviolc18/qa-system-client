'use strict';

const PerguntaModel = require('./pergunta.model');

module.exports = async function(query, changes) {
  if (changes.usuarioId) {
    throw new Error('Referência de usuário da pergunta não deve ser alterada');
  }

  const updatedPergunta = await PerguntaModel.findOneAndUpdate(query, changes, { new: true });

  if (!updatedPergunta) {
    throw new Error('Pergunta não encontrada');
  }

  return updatedPergunta;
};
