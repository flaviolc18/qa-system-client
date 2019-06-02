'use strict';

const entidades = require('../entidades');
const { getRandomItem } = require('../../src/utils');

module.exports = {
  padrao: async ({ numUsuarios, numPerguntas, numRespostas }) => {
    const usuariosPromises = [];
    const perguntasPromises = [];
    const respostasPromises = [];

    for (let i = 0; i < numUsuarios; i++) {
      usuariosPromises.push(entidades.usuario());
    }

    const usuarios = await Promise.all(usuariosPromises);

    for (let i = 0; i < numPerguntas; i++) {
      const randomUsuarioId = getRandomItem(usuarios)._id;

      perguntasPromises.push(entidades.pergunta({ usuarioId: randomUsuarioId }));
    }

    const perguntas = await Promise.all(perguntasPromises);

    for (let i = 0; i < numRespostas; i++) {
      const randomUsuarioId = getRandomItem(usuarios)._id;
      const randomPerguntaId = getRandomItem(perguntas)._id;

      respostasPromises.push(entidades.resposta({ usuarioId: randomUsuarioId, perguntaId: randomPerguntaId }));
    }
    const respostas = await Promise.all(respostasPromises);

    return { usuarios, perguntas, respostas };
  },
};
