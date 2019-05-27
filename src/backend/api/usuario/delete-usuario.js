'use strict';

const usuarioSchema = require('./usuario.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(usuarioSchema);

  fastify.delete('/usuarios/:usuarioId', schemaHelper.delete('usuario.delete'), async function({
    params: { usuarioId },
  }) {
    try {
      const usuario = await fastify.core.models.usuario.delete({ _id: usuarioId });

      return fastify.getResponseObject(usuario);
    } catch ({ message }) {
      throw fastify.httpErrors.notFound();
    }
  });
};
