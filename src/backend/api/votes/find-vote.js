'use strict';

module.exports = async function(fastify) {
  fastify.get('/posts/:postId/vote', async function({ params: { postId }, cookies: { session: sessionId } }) {
    const { usuarioId } = (await fastify.core.models.session.find(sessionId)) || {};

    const vote = await fastify.core.models.votes.find({ postId, usuarioId });

    return fastify.getResponseObject(vote);
  });
};
