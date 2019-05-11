'use strict';

const usuarioSchema = require('./usuario.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(usuarioSchema);

  fastify.get('/usuarios/perguntas/:perguntaId', schemaHelper.findAll('usuario.find.pergunta'), async function({
    params: { perguntaId },
  }) {
    const pergunta = await fastify.core.models.pergunta.find({ _id: perguntaId });

    if (!pergunta) {
      throw fastify.httpErrors.notFound();
    }

    const usuario = await fastify.core.models.usuario.find({ _id: pergunta.usuarioId });

    return fastify.getResponseObject(usuario);
  });
};
