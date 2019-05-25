'use strict';

const findUsuario = require('../usuario/find-usuario');

const PerguntaModel = require('./pergunta.model');

module.exports = async function(perguntaData) {
  const usuario = await findUsuario({ _id: perguntaData.usuarioId });

  if (!usuario) {
    throw new Error('Referência para usuário inválida');
  }

  let tags = perguntaData.tags.filter(tag => tag !== '');

  tags = tags.map(tag => {
    if (tag[0] === ' ') {
      return tag.slice(1);
    }

    return tag;
  });
  tags = [...new Set(tags)];

  const data = { ...perguntaData, tags };

  const defaultValues = {
    dataCriacao: new Date(),
    downvotes: 0,
    upvotes: 0,
  };

  //FIXME: trocar ordem
  const pergunta = new PerguntaModel({ ...defaultValues, ...data });

  return pergunta.save();
};
