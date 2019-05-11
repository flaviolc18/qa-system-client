'use strict';

const sessionSchema = require('../session/session.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(sessionSchema);

  fastify.delete('/usuarios/logout', schemaHelper.delete('usuario.logout'), async function({
    cookies: { session: sessionId },
  }) {
    try {
      return await fastify.core.models.session.delete(sessionId);
    } catch ({ message }) {
      throw fastify.httpErrors.notFound();
    }
  });
};
