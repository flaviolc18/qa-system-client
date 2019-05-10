'use strict';

module.exports = async function(fastify) {
  fastify.register(require('./find-all-perguntas'));
  fastify.register(require('./find-usuario-pergunta'));
  fastify.register(require('./find-perguntas-usuario'));
  fastify.register(require('./find-respostas-pergunta'));
  fastify.register(require('./find-usuarios-respostas-pergunta'));
  fastify.register(require('./create-pergunta'));
  fastify.register(require('./find-pergunta'));
  fastify.register(require('./update-pergunta'));
  fastify.register(require('./delete-pergunta'));
};
