'use strict';

const bcrypt = require('bcryptjs');
const { saltWorkFactor } = require('../../../core/constants');

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

      const salt = bcrypt.genSaltSync(saltWorkFactor);
      const hash = bcrypt.hashSync(newPassword, salt);

      const updatedUsuario = await fastify.core.models.usuario.update({ _id: usuarioId }, { password: hash });

      return fastify.getResponseObject(updatedUsuario);
    } catch ({ message }) {
      throw fastify.httpErrors.notFound();
    }
  });
};
