'use strict';

const respostaSchema = require('./resposta.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(respostaSchema);

  fastify.delete('/respostas/:respostaId', schemaHelper.delete('resposta.delete'), async function({
    params: { respostaId },
    cookies: { session: sessionId },
  }) {
    const resposta = await fastify.core.models.resposta.find({ _id: respostaId });

    if (!resposta) {
      throw fastify.httpErrors.notFound();
    }

    const { usuarioId } = await fastify.core.models.session.find(sessionId);

    if (!usuarioId.equals(resposta.usuarioId)) {
      throw fastify.httpErrors.unauthorized('Somente o usuário que postou a resposta pode deletá-la');
    }
    const respostaDeletada = await fastify.core.models.resposta.delete({ _id: respostaId });

    return fastify.getResponseObject(respostaDeletada);
  });
};
