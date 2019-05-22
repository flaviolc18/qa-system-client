'use strict';

module.exports = async function(fastify) {
  fastify.get('/posts/:postId/upvote', async function({ params: { postId }, cookies: { session: sessionId } }) {
    try {
      const { usuarioId } = (await fastify.core.models.session.find(sessionId)) || {};

      await fastify.core.models.votes.upvote({ postId, usuarioId });

      return {};
    } catch (message) {
      throw fastify.httpErrors.badRequest(message);
    }
  });
};
