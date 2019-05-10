'use strict';

module.exports = async function(fastify) {
  fastify.get('/perguntas/:perguntaId/respostas', {}, async function({ params: { perguntaId } }) {
    const pergunta = await fastify.core.models.pergunta.find({ _id: perguntaId });

    if (!pergunta) {
      throw fastify.httpErrors.notFound();
    }

    const respostas = await fastify.core.models.resposta.findAll({ perguntaId: pergunta._id });

    return { elements: respostas, total: respostas.length };
  });
};
