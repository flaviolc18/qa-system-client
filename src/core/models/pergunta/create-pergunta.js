'use strict';

const findUsuario = require('../usuario/find-usuario');

const PerguntaModel = require('./pergunta.model');

module.exports = async function(perguntaData) {
  const usuario = await findUsuario({ _id: perguntaData.usuarioId });

  if (!usuario) {
    throw new Error('Referência para usuário inválida');
  }

  if (Array.isArray(perguntaData.tags)) {
    perguntaData.tags = [...new Set(perguntaData.tags.map(tag => tag.trim()).filter(tag => tag))];
  }

  const defaultValues = {
    dataCriacao: new Date(),
    downvotes: 0,
    upvotes: 0,
  };

  const pergunta = new PerguntaModel({ ...perguntaData, ...defaultValues });

  return pergunta.save();
};
