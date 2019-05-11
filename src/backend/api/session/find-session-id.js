'use strict';

const sessionSchema = require('./session.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(sessionSchema);

  fastify.get('/sessions/:sessionId', schemaHelper.find('session.find'), async function({ params: { sessionId } }) {
    if (!sessionId) {
      return {};
    }
    const session = await fastify.core.models.session.find(sessionId);

    if (!session) {
      throw fastify.httpErrors.notFound();
    }

    return session;
  });
};
