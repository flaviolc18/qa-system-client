'use strict';

module.exports = async function(fastify) {
  fastify.register(require('./find-session'));
  fastify.register(require('./find-session-id'));
};
