'use strict';

const usuarioSchema = require('./usuario.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(usuarioSchema);

  fastify.get('/usuarios', schemaHelper.findAll('usuario.findAll'), async function() {
    return fastify.core.models.usuario.findAll();
  });
};
