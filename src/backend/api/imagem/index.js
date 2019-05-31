'use strict';

module.exports = async function(fastify) {
  fastify.register(require('./find-imagem'));
  fastify.register(require('./delete-imagem'));
  fastify.register(require('./upload-imagem'));
};
