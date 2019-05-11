'use strict';

const respostaSchema = require('./resposta.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(respostaSchema);

  fastify.get('/respostas', schemaHelper.findAll('resposta.findAll'), async function() {
    const respostas = await fastify.core.models.resposta.findAll();

    return fastify.getResponseObject(respostas);
  });
};
