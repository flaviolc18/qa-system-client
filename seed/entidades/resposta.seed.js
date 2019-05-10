'use strict';

const RespostaModel = require('../../src/core/models/resposta/resposta.model');
const respostaFixture = require('../fixtures/resposta.fixture');

const usuarioSeed = require('./usuario.seed');
const perguntaSeed = require('./pergunta.seed');

module.exports = async ({ usuarioId, perguntaId, ...dadosResposta } = {}) => {
  usuarioId = usuarioId || (await usuarioSeed())._id;
  perguntaId = perguntaId || (await perguntaSeed({ usuarioId }))._id;

  dadosResposta = respostaFixture({ usuarioId, perguntaId, ...dadosResposta });

  const resposta = new RespostaModel(dadosResposta);

  const {
    _doc: { __v, ...createdResposta },
  } = await resposta.save();

  return createdResposta;
};
