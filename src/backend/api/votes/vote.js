'use strict';

module.exports = async function(fastify) {
  fastify.get('/posts/:postId/vote/:usuarioId/:vote', async function({ params: { postId, vote, usuarioId } }) {
    try {
      await fastify.core.models.votes.vote({ postId, usuarioId, vote });

      return {};
    } catch (message) {
      throw fastify.httpErrors.badRequest(message);
    }
  });
};
