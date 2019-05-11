'use strict';

const perguntaSchema = require('./pergunta.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(perguntaSchema);

  fastify.get('/perguntas/usuarios/:usuarioId', schemaHelper.findAll('perguntas.findAll.usuario'), async function({
    params: { usuarioId },
  }) {
    const perguntas = await fastify.core.models.pergunta.findAll({ usuarioId });

    return fastify.getResponseObject(perguntas);
  });
};
