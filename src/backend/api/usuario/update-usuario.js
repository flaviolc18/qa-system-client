'use strict';

const usuarioSchema = require('./usuario.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(usuarioSchema);

  fastify.post('/usuarios/:usuarioId', schemaHelper.update('usuario.update'), async function({
    params: { usuarioId },
    body: usuarioData,
  }) {
    try {
      const usuario = await fastify.core.models.usuario.update({ _id: usuarioId }, usuarioData);

      return fastify.getResponseObject(usuario);
    } catch ({ message }) {
      throw fastify.httpErrors.notFound();
    }
  });
};
