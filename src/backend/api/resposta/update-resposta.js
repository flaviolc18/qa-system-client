'use strict';

const respostaSchema = require('./resposta.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(respostaSchema);

  fastify.post('/respostas/:respostaId', schemaHelper.update('resposta.update'), async function({
    params: { respostaId },
    body: respostaData,
  }) {
    try {
      return await fastify.core.models.resposta.update({ _id: respostaId }, respostaData);
    } catch ({ message }) {
      throw fastify.httpErrors.badRequest(message);
    }
  });
};
