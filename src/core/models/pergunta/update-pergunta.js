'use strict';

const { update: updateTags } = require('../tags');
const PerguntaModel = require('./pergunta.model');

module.exports = async function(query, { tags: newTagNames, ...changes }) {
  if (changes.usuarioId) {
    throw new Error('Referência de usuário da pergunta não deve ser alterada');
  }

  const currentPergunta = await PerguntaModel.findOne(query);

  if (!currentPergunta) {
    throw new Error('Pergunta não encontrada');
  }

  if (newTagNames) {
    const oldTagIds = currentPergunta.tags;

    changes.tags = await updateTags(oldTagIds, newTagNames);
  }

  return PerguntaModel.findOneAndUpdate(query, changes, { new: true });
};
