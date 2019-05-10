'use strict';

module.exports = async function(fastify) {
  fastify.get('/respostas/usuario/:usuarioId', {}, async function({ params: { usuarioId } }) {
    const respostas = await fastify.core.models.resposta.findAll({ usuarioId });

    return { elements: respostas, total: respostas.length };
  });
};
