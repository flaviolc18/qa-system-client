'use strict';

module.exports = async function(fastify) {
  fastify.post('/usuarios/change-password/:usuarioId', async function({
    params: { usuarioId },
    body: { password, newPassword },
  }) {
    const usuario = await fastify.core.models.usuario.find({ _id: usuarioId });

    if (!usuario) {
      throw fastify.httpErrors.notFound();
    }

    const isValid = await usuario.comparePassword(password);

    if (!isValid) {
      throw fastify.httpErrors.unauthorized('Senha incorreta');
    }

    const updatedUsuario = await fastify.core.models.usuario.update({ _id: usuarioId }, { password: newPassword });

    return fastify.getResponseObject(updatedUsuario);
  });
};
