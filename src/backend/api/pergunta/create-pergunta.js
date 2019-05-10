'use strict';

module.exports = async function(fastify) {
  fastify.post('/perguntas', {}, async function({ body: perguntaData }) {
    try {
      const resposta = await fastify.core.models.pergunta.create(perguntaData);

      return { elements: [resposta], total: 1 };
    } catch ({ message }) {
      throw fastify.httpErrors.badRequest(message);
    }
  });
};
