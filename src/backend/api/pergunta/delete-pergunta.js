'use strict';

const perguntaSchema = require('./pergunta.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(perguntaSchema);

  fastify.delete('/perguntas/:perguntaId', schemaHelper.delete('pergunta.delete'), async function({
    params: { perguntaId },
    cookies: { session: sessionId },
  }) {
    const pergunta = await fastify.core.models.pergunta.find({ _id: perguntaId });

    if (!pergunta) {
      throw fastify.httpErrors.notFound();
    }

    const { usuarioId } = await fastify.core.models.session.find(sessionId);

    if (!usuarioId.equals(pergunta.usuarioId)) {
      throw fastify.httpErrors.unauthorized('Somente o usuário que postou a pergunta pode deletá-la');
    }

    const perguntaDeletada = await fastify.core.models.pergunta.delete({ _id: perguntaId });

    return fastify.getResponseObject(perguntaDeletada);
  });
};
