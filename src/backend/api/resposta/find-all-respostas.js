'use strict';

const schema = { querystring: { skip: { type: 'integer' }, limit: { type: 'integer' } } };

module.exports = async function(fastify) {
  fastify.get('/respostas', { schema }, async function({ query: { skip = 0, limit = 10 } }) {
    const respostas = await fastify.core.models.resposta.findAll({}, { skip, limit });

    return fastify.getResponseObject(respostas);
  });
};
