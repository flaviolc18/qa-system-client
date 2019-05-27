'use strict';

const perguntaSchema = require('./pergunta.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(perguntaSchema);

  fastify.delete('/perguntas/:perguntaId', schemaHelper.delete('pergunta.delete'), async function({
    params: { perguntaId },
  }) {
    try {
      const pergunta = await fastify.core.models.pergunta.delete({ _id: perguntaId });

      return fastify.getResponseObject(pergunta);
    } catch ({ message }) {
      throw fastify.httpErrors.notFound();
    }
  });
};
