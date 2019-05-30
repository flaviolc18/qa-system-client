'use strict';

const usuarioSchema = require('./usuario.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(usuarioSchema);

  fastify.get('/usuarios/respostas/:respostaId', schemaHelper.findAll('usuario.find.resposta'), async function({
    params,
  }) {
    const resposta = await fastify.core.models.resposta.find({ _id: params.respostaId });

    if (!resposta) {
      throw fastify.httpErrors.notFound();
    }

    const usuario = await fastify.core.models.usuario.find({ _id: resposta.usuarioId });

    return fastify.getResponseObject(usuario);
  });
};
