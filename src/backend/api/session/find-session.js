'use strict';

module.exports = async function(fastify) {
  fastify.get('/sessions', {}, async function({ cookies: { session: sessioId } }) {
    const s = await fastify.core.models.session.find({ _id: sessioId });

    return fastify.getResponseObject(s);
  });
};
