'use strict';

const usuarioSchema = require('./usuario.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(usuarioSchema);

  fastify.post('/usuarios/signup', schemaHelper.create('usuario.create'), async function({ body: usuarioData }, res) {
    const usuario = await fastify.core.models.usuario.create(usuarioData);
    const session = await fastify.core.models.session.create(usuario._id);

    return res
      .setCookie('session', session._id, {
        path: '/',
      })
      .send(fastify.getResponseObject(usuario));
  });
};
