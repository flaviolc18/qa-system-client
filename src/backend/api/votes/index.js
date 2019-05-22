'use strict';

module.exports = async function(fastify) {
  fastify.register(require('./vote'));
  fastify.register(require('./unvote'));
};
