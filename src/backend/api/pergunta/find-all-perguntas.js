'use strict';

const perguntaSchema = require('./pergunta.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(perguntaSchema);

  fastify.get('/perguntas', schemaHelper.findAll('pergunta.findAll'), async function() {
    const perguntas = await fastify.core.models.pergunta.findAll();

    return fastify.getResponseObject(perguntas);
  });
};
