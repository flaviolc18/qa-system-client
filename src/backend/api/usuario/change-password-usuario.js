'use strict';

module.exports = async function(fastify) {
  fastify.post('/usuarios/change-password/:usuarioId', {}, async function({
    params: { usuarioId },
    body: { password, newPassword },
  }) {
    try {
      const usuario = await fastify.core.models.usuario.find({ _id: usuarioId });
      const isValid = await usuario.comparePassword(password);

      if (!isValid) {
        throw fastify.httpErrors.unauthorized();
      }

      const updatedUsuario = await fastify.core.models.usuario.update({ _id: usuarioId }, { password: newPassword });

      return fastify.getResponseObject(updatedUsuario);
    } catch ({ message }) {
      throw fastify.httpErrors.notFound();
    }
  });
};
