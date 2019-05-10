'use strict';

const PerguntaModel = require('../../src/core/models/pergunta/pergunta.model');
const perguntaFixture = require('../fixtures/pergunta.fixture');

const usuarioSeed = require('./usuario.seed');

module.exports = async ({ usuarioId, ...dadosPergunta } = {}) => {
  usuarioId = usuarioId || (await usuarioSeed())._id;

  dadosPergunta = perguntaFixture({ usuarioId, ...dadosPergunta });

  const pergunta = new PerguntaModel(dadosPergunta);

  const {
    _doc: { __v, ...createdPergunta },
  } = await pergunta.save();

  return createdPergunta;
};
