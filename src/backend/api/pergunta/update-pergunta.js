'use strict';

const perguntaSchema = require('./pergunta.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(perguntaSchema);

  fastify.post('/perguntas/:perguntaId', schemaHelper.update('pergunta.update'), async function({
    params: { perguntaId },
    body: perguntaData,
  }) {
    try {
      const pergunta = await fastify.core.models.pergunta.update({ _id: perguntaId }, perguntaData);

      return fastify.getResponseObject(pergunta);
    } catch ({ message }) {
      throw fastify.httpErrors.badRequest(message);
    }
  });
};
