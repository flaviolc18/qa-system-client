'use strict';

const respostaSchema = require('./resposta.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(respostaSchema);

  fastify.delete('/respostas/:respostaId', schemaHelper.delete('resposta.delete'), async function({
    params: { respostaId },
  }) {
    try {
      return await fastify.core.models.resposta.delete(respostaId);
    } catch ({ message }) {
      throw fastify.httpErrors.notFound();
    }
  });
};
