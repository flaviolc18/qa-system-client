'use strict';

const findUsuario = require('../usuario/find-usuario');

const PerguntaModel = require('./pergunta.model');

module.exports = async function(perguntaData) {
  const usuario = await findUsuario({ _id: perguntaData.usuarioId });

  if (!usuario) {
    throw new Error('Referência para usuário inválida');
  }

  const tags = [...new Set(perguntaData.tags.filter(tag => tag && tag !== '').map(tag => tag.trim()))];

  const data = { ...perguntaData, tags };

  const defaultValues = {
    dataCriacao: new Date(),
    downvotes: 0,
    upvotes: 0,
  };

  const pergunta = new PerguntaModel({ ...data, ...defaultValues });

  return pergunta.save();
};
