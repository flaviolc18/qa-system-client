'use strict';

module.exports = async function(fastify) {
  fastify.get('/perguntas/:perguntaId/usuario', {}, async function({ params: { perguntaId } }) {
    const pergunta = await fastify.core.models.pergunta.find({ _id: perguntaId });

    if (!pergunta) {
      throw fastify.httpErrors.notFound();
    }

    const usuario = await fastify.core.models.usuario.find({ _id: pergunta.usuarioId });

    return { elements: [usuario], total: 1 };
  });
};
