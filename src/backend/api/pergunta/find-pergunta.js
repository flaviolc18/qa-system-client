'use strict';

module.exports = async function(fastify) {
  fastify.get('/perguntas/:perguntaId', {}, async function({ params: { perguntaId } }) {
    const pergunta = await fastify.core.models.pergunta.find({ _id: perguntaId });

    if (!pergunta) {
      throw fastify.httpErrors.notFound();
    }

    return { elements: [pergunta], total: 1 };
  });
};
