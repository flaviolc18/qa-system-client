'use strict';

const { find: findUsuario } = require('../usuario');
const { generate: generateTags } = require('../tags');

const PerguntaModel = require('./pergunta.model');

module.exports = async function({ tags, ...perguntaData }) {
  const usuario = await findUsuario({ _id: perguntaData.usuarioId });

  if (!usuario) {
    throw new Error('Referência para usuário inválida');
  }

  if (tags) {
    perguntaData.tags = await generateTags(tags);
  }

  const defaultValues = {
    dataCriacao: new Date(),
    downvotes: 0,
    upvotes: 0,
  };

  const pergunta = new PerguntaModel({ ...perguntaData, ...defaultValues });

  return pergunta.save();
};
