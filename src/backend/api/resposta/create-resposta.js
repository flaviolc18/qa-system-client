'use strict';

const respostaSchema = require('./resposta.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(respostaSchema);

  fastify.post('/respostas', schemaHelper.create('resposta.create'), async function({ body: respostaData }) {
    try {
      const resposta = await fastify.core.models.resposta.create(respostaData);

      return fastify.getResponseObject(resposta);
    } catch ({ message }) {
      throw fastify.httpErrors.badRequest(message);
    }
  });
};
