'use strict';

module.exports = async function(fastify) {
  fastify.post('/respostas', {}, async function({ body: respostaData }) {
    try {
      const resposta = await fastify.core.models.resposta.create(respostaData);

      return { elements: [resposta], total: 1 };
    } catch ({ message }) {
      throw fastify.httpErrors.badRequest(message);
    }
  });
};
