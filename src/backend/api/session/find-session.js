'use strict';

const sessionSchema = require('./session.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(sessionSchema);

  fastify.get('/sessions', schemaHelper.find('session.find'), async function({ cookies: { session: sessionId } }) {
    if (!sessionId) {
      return {};
    }
    const session = await fastify.core.models.session.find(sessionId);

    if (!session) {
      return {};
    }

    return session;
  });
};
