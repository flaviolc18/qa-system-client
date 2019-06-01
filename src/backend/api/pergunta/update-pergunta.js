'use strict';

const perguntaSchema = require('./pergunta.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(perguntaSchema);

  fastify.post('/perguntas/:perguntaId', schemaHelper.update('pergunta.update'), async function({
    params: { perguntaId },
    body: perguntaData,
    cookies: { session: sessionId },
  }) {
    const pergunta = await fastify.core.models.pergunta.find({ _id: perguntaId });

    if (!pergunta) {
      throw fastify.httpErrors.notFound();
    }

    const { usuarioId } = await fastify.core.models.session.find(sessionId);

    if (!usuarioId.equals(pergunta.usuarioId)) {
      throw fastify.httpErrors.unauthorized('Somente o usuário que postou a pergunta pode editá-la');
    }

    try {
      const perguntaAtualizada = await fastify.core.models.pergunta.update({ _id: perguntaId }, perguntaData);

      return fastify.getResponseObject(perguntaAtualizada);
    } catch ({ message }) {
      throw fastify.httpErrors.badRequest(message);
    }
  });
};
