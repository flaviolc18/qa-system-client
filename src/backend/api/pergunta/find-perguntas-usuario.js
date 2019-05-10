'use strict';

module.exports = async function(fastify) {
  fastify.get('/perguntas/usuario/:usuarioId', {}, async function({ params: { usuarioId } }) {
    const perguntas = await fastify.core.models.pergunta.findAll({ usuarioId });

    return { elements: perguntas, total: perguntas.length };
  });
};
