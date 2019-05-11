'use strict';

const respostaSchema = require('./resposta.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(respostaSchema);

  fastify.delete('/respostas/:respostaId', schemaHelper.delete('resposta.delete'), async function({
    params: { respostaId },
  }) {
    try {
      const resposta = await fastify.core.models.resposta.delete(respostaId);

      return fastify.getResponseObject(resposta);
    } catch ({ message }) {
      throw fastify.httpErrors.notFound();
    }
  });
};
