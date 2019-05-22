'use strict';

module.exports = async function(fastify) {
  fastify.get('/posts/:postId/unvote/:usuarioId', async function({ params: { postId, usuarioId } }) {
    try {
      await fastify.core.models.votes.unvote({ postId, usuarioId });

      return {};
    } catch (message) {
      throw fastify.httpErrors.badRequest(message);
    }
  });
};
