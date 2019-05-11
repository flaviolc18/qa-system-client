'use strict';

const usuarioSchema = require('./usuario.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(usuarioSchema);

  fastify.get('/usuarios/:usuarioId', schemaHelper.find('usuario.find'), async function({ params: { usuarioId } }) {
    const usuario = await fastify.core.models.usuario.find({ _id: usuarioId });

    if (!usuario) {
      throw fastify.httpErrors.notFound();
    }

    return fastify.getResponseObject(usuario);
  });
};
