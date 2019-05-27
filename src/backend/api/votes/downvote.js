'use strict';

module.exports = async function(fastify) {
  fastify.get('/posts/:postId/downvote', async function({ params: { postId }, cookies: { session: sessionId } }) {
    try {
      const { usuarioId } = (await fastify.core.models.session.find(sessionId)) || {};

      const vote = await fastify.core.models.votes.downvote({ postId, usuarioId });

      return fastify.getResponseObject(vote);
    } catch (message) {
      throw fastify.httpErrors.badRequest(message);
    }
  });
};
