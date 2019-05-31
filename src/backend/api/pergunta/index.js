'use strict';

module.exports = async function(fastify) {
  fastify.register(require('./search-perguntas'));
  fastify.register(require('./find-perguntas-usuario'));
  fastify.register(require('./create-pergunta'));
  fastify.register(require('./find-pergunta'));
  fastify.register(require('./update-pergunta'));
  fastify.register(require('./delete-pergunta'));
};
