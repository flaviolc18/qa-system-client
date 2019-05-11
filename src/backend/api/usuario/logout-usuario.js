'use strict';

module.exports = async function(fastify) {
  fastify.delete('/usuarios/logout', {}, async function({ cookies: { session: sessionId } }) {
    try {
      return await fastify.core.models.session.delete(sessionId);
    } catch ({ message }) {
      throw fastify.httpErrors.notFound();
    }
  });
};
