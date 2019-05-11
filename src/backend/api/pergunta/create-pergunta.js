'use strict';

const perguntaSchema = require('./pergunta.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(perguntaSchema);

  fastify.post('/perguntas', schemaHelper.create('pergunta.create'), async function({ body: perguntaData }) {
    try {
      const pergunta = await fastify.core.models.pergunta.create(perguntaData);

      return fastify.getResponseObject(pergunta);
    } catch ({ message }) {
      throw fastify.httpErrors.badRequest(message);
    }
  });
};
