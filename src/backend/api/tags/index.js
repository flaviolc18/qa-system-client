'use strict';

module.exports = async function(fastify) {
  fastify.register(require('./find-tags-pergunta'));
};
