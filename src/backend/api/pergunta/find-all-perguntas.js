'use strict';

module.exports = async function(fastify) {
  fastify.get('/perguntas', {}, async function() {
    const perguntas = await fastify.core.models.pergunta.findAll();

    return { elements: perguntas, total: perguntas.length };
  });
};
