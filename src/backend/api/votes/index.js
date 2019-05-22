'use strict';

module.exports = async function(fastify) {
  fastify.register(require('./upvote'));
  fastify.register(require('./downvote'));
  fastify.register(require('./unvote'));
};
