'use strict';

module.exports = async function(fastify) {
  fastify.register(require('./find-imagem'));
  fastify.register(require('./find-imagem-nome'));
  fastify.register(require('./delete-imagem'));
  fastify.register(require('./upload-imagem'));
};
