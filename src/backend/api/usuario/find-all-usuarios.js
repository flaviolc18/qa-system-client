'use strict';

const schema = { querystring: { skip: { type: 'integer' }, limit: { type: 'integer' } } };

module.exports = async function(fastify) {
  fastify.get('/usuarios', { schema }, async function({ query: { skip = 0, limit = 10 } }) {
    const usuarios = await fastify.core.models.usuario.findAll({}, { skip, limit });

    return fastify.getResponseObject(usuarios);
  });
};
