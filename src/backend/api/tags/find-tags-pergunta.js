'use strict';

module.exports = async function(fastify) {
  fastify.get('/tags/pergunta/:perguntaId', async function({ params: { perguntaId } }) {
    const pergunta = await fastify.core.models.pergunta.find({ _id: perguntaId });

    if (!pergunta) {
      throw fastify.httpErrors.notFound();
    }

    const tags = await fastify.core.models.tags.findAll({ _id: { $in: pergunta.tags } });

    return fastify.getResponseObject(tags);
  });
};
