'use strict';

const respostaSchema = require('./resposta.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(respostaSchema);

  fastify.get('/respostas/perguntas/:perguntaId', schemaHelper.findAll('resposta.findAll.pergunta'), async function({
    params: { perguntaId },
  }) {
    const respostas = await fastify.core.models.resposta.findAll({ perguntaId });

    return fastify.getResponseObject(respostas);
  });
};
