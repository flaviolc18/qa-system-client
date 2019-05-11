'use strict';

const respostaSchema = require('./resposta.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(respostaSchema);

  fastify.get('/respostas/usuarios/:usuarioId', schemaHelper.findAll('resposta.findAll.usuarios'), async function({
    params: { usuarioId },
  }) {
    const respostas = await fastify.core.models.resposta.findAll({ usuarioId });

    return fastify.getResponseObject(respostas);
  });
};
