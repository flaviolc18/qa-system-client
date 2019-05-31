'use strict';

module.exports = async function(fastify) {
  fastify.get('/imagem/:imagemId', async function({ params: { imagemId } }) {
    const imagem = await fastify.core.models.imagem.find({ _id: imagemId });

    if (!imagem) {
      throw fastify.httpErrors.notFound();
    }

    return fastify.getResponseObject(imagem);
  });
};
