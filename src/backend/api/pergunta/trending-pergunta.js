'use strict';

module.exports = async function(fastify) {
  fastify.get('/perguntas/trending', async function() {
    const yesterday = new Date().setDate(new Date().getDate() - 1);

    const perguntas = await fastify.core.models.pergunta.findAll({ dataCriacao: { $gt: yesterday } });

    return fastify.getResponseObject(perguntas);
  });
};
