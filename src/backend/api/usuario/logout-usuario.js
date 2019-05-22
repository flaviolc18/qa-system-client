'use strict';

module.exports = async function(fastify) {
  fastify.delete('/usuarios/logout', {}, async function({ cookies: { session: sessionId } }) {
    try {
      const session = await fastify.core.models.session.delete(sessionId);

      return fastify.getResponseObject(session);
    } catch ({ message }) {
      throw fastify.httpErrors.notFound();
    }
  });
};
