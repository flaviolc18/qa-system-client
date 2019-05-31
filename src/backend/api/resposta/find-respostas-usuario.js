'use strict';

const schema = { querystring: { skip: { type: 'integer' }, limit: { type: 'integer' } } };

module.exports = async function(fastify) {
  fastify.get('/respostas/usuarios/:usuarioId', { schema }, async function({
    params: { usuarioId },
    query: { skip = 0, limit = 10 },
  }) {
    const respostas = await fastify.core.models.resposta.findAll({ usuarioId }, { skip, limit });

    return fastify.getResponseObject(respostas);
  });
};
