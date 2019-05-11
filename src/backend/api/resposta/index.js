'use strict';

module.exports = async function(fastify) {
  fastify.register(require('./create-resposta'));
  fastify.register(require('./delete-resposta'));
  fastify.register(require('./find-all-respostas'));
  fastify.register(require('./find-resposta'));
  fastify.register(require('./find-respostas-pergunta'));
  fastify.register(require('./find-respostas-usuario'));
  fastify.register(require('./update-resposta'));
};
