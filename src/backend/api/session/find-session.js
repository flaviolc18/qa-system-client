'use strict';

module.exports = async function(fastify) {
  fastify.get('/sessions', async function({ cookies: { session: sessioId } }) {
    const session = await fastify.core.models.session.find(sessioId);

    return fastify.getResponseObject(session);
  });
};
