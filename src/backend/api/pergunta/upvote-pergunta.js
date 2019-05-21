'use strict';

module.exports = async function(fastify) {
  fastify.get('/perguntas/upvote/:perguntaId', {}, async function({ params: { perguntaId } }) {
    try {
      const data = await fastify.core.models.pergunta.find({ _id: perguntaId });

      const pergunta = await fastify.core.models.pergunta.update({ _id: perguntaId }, { upvotes: data.upvotes + 1 });

      return fastify.getResponseObject(pergunta);
    } catch ({ message }) {
      throw fastify.httpErrors.badRequest(message);
    }
  });
};
