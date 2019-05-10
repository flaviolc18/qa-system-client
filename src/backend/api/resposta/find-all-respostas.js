'use strict';

const respostaSchema = require('./resposta.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(respostaSchema);

  fastify.get('/respostas', schemaHelper.findAll('resposta.findAll'), async function() {
    return fastify.core.models.resposta.findAll();
  });
};
