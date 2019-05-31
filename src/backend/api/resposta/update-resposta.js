'use strict';

const respostaSchema = require('./resposta.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(respostaSchema);

  fastify.post('/respostas/:respostaId', schemaHelper.update('resposta.update'), async function({
    params: { respostaId },
    body: respostaData,
    cookies: { session: sessionId },
  }) {
    const resposta = await fastify.core.models.resposta.find({ _id: respostaId });

    if (!resposta) {
      throw fastify.httpErrors.notFound();
    }

    const { usuarioId } = await fastify.core.models.session.find(sessionId);

    if (!usuarioId.equals(resposta.usuarioId)) {
      throw fastify.httpErrors.unauthorized('Somente o usuário que postou a resposta pode editá-la');
    }

    try {
      const respostaAtualizada = await fastify.core.models.resposta.update({ _id: respostaId }, respostaData);

      return fastify.getResponseObject(respostaAtualizada);
    } catch ({ message }) {
      throw fastify.httpErrors.badRequest(message);
    }
  });
};
