'use strict';

module.exports = async function(fastify) {
  fastify.get('/perguntas/downvote/:perguntaId', {}, async function({ params: { perguntaId } }) {
    try {
      const data = await fastify.core.models.pergunta.find({ _id: perguntaId });

      const pergunta = await fastify.core.models.pergunta.update(
        { _id: perguntaId },
        { downvotes: data.downvotes + 1 }
      );

      return fastify.getResponseObject(pergunta);
    } catch ({ message }) {
      throw fastify.httpErrors.badRequest(message);
    }
  });
};
