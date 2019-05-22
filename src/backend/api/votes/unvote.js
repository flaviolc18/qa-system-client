'use strict';

module.exports = async function(fastify) {
  fastify.get('/posts/:postId/unvote', async function({ params: { postId }, cookies: { session: sessionId } }) {
    try {
      const { usuarioId } = (await fastify.core.models.session.find(sessionId)) || {};

      await fastify.core.models.votes.unvote({ postId, usuarioId });

      return {};
    } catch (message) {
      throw fastify.httpErrors.badRequest(message);
    }
  });
};
