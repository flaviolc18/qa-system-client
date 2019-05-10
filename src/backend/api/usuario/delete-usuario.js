'use strict';

const usuarioSchema = require('./usuario.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(usuarioSchema);

  fastify.delete('/usuarios/:usuarioId', schemaHelper.delete('usuario.delete'), async function({
    params: { usuarioId },
  }) {
    try {
      return await fastify.core.models.usuario.delete(usuarioId);
    } catch ({ message }) {
      throw fastify.httpErrors.notFound();
    }
  });
};
