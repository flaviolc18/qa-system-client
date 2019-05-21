'use strict';

module.exports = async function(fastify) {
  fastify.get('/respostas/upvote/:respostaId', {}, async function({ params: { respostaId } }) {
    try {
      const data = await fastify.core.models.resposta.find({ _id: respostaId });

      const resposta = await fastify.core.models.resposta.update({ _id: respostaId }, { upvotes: data.upvotes + 1 });

      return fastify.getResponseObject(resposta);
    } catch ({ message }) {
      throw fastify.httpErrors.badRequest(message);
    }
  });
};
