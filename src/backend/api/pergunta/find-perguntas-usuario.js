'use strict';

const schema = { querystring: { skip: { type: 'integer' }, limit: { type: 'integer' } } };

module.exports = async function(fastify) {
  fastify.get('/perguntas/usuarios/:usuarioId', { schema }, async function({
    params: { usuarioId },
    query: { skip = 0, limit = 10 },
  }) {
    const perguntas = await fastify.core.models.pergunta.findAll({ usuarioId }, { skip, limit });

    return fastify.getResponseObject(perguntas);
  });
};
