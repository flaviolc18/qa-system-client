'use strict';

const respostaSchema = require('./resposta.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(respostaSchema);

  fastify.get('/respostas/:respostaId', schemaHelper.find('resposta.find'), async function({ params: { respostaId } }) {
    const resposta = await fastify.core.models.resposta.find({ _id: respostaId });

    if (!resposta) {
      throw fastify.httpErrors.notFound();
    }

    return fastify.getResponseObject(resposta);
  });
};
