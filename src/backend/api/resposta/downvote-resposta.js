'use strict';

module.exports = async function(fastify) {
  fastify.get('/respostas/downvote/:respostaId', {}, async function({ params: { respostaId } }) {
    try {
      const data = await fastify.core.models.resposta.find({ _id: respostaId });

      const resposta = await fastify.core.models.resposta.update(
        { _id: respostaId },
        { downvotes: data.downvotes + 1 }
      );

      return fastify.getResponseObject(resposta);
    } catch ({ message }) {
      throw fastify.httpErrors.badRequest(message);
    }
  });
};
