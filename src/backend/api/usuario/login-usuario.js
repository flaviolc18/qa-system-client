'use strict';

const usuarioSchema = require('./usuario.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(usuarioSchema);

  fastify.post('/usuarios/login', schemaHelper.find('usuario.login'), async function(
    { body: { username, email, password } },
    reply
  ) {
    const query = username ? { username } : { email };
    const usuario = await fastify.core.models.usuario.find(query);

    if (!usuario) {
      throw fastify.httpErrors.notFound();
    }

    const isCorrectPass = await usuario.comparePassword(password);

    if (!isCorrectPass) {
      throw fastify.httpErrors.unauthorized();
    }

    const session = await fastify.core.models.session.create(usuario._id);

    return reply
      .setCookie('session', session._id, {
        path: '/',
      })
      .send(usuario);
  });
};
