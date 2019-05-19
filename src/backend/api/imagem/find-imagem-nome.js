'use strict';

module.exports = async function(fastify) {
  fastify.get('/imagem/nome/:nome', async function({ params: { nome } }) {
    const imagem = await fastify.core.models.imagem.findOne({ nome });

    if (!imagem) {
      throw fastify.httpErrors.notFound();
    }

    return fastify.getResponseObject(imagem);
  });
};
