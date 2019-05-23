'use strict';

module.exports = async function(fastify) {
  fastify.get('/sessions', async function({ cookies: { session: sessioId } }) {
    const session = await fastify.core.models.session.find(sessioId);

    if (!session) {
      // FIXME: o client sempre espera um responseObject mesmo quando não existe, deveria ele tratar para receber um 404?
      // throw fastify.httpErrors.notFound();

      return fastify.getResponseObject({});
    }

    return fastify.getResponseObject(session);
  });
};
