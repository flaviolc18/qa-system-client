'use strict';

module.exports = async function(fastify) {
  fastify.get('/usuarios/:usuarioId', {}, async function({ params: { usuarioId } }) {
    const usuario = await fastify.core.models.usuario.find({ _id: usuarioId });

    if (!usuario) {
      throw fastify.httpErrors.notFound();
    }

    return { elements: [usuario], total: 1 };
  });
};
