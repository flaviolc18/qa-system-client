'use strict';

module.exports = async function(fastify) {
  fastify.get('/imagem/:imagemId', async function({ params: { imagemId } }) {
    const imagem = await fastify.core.models.imagem.find({ _id: imagemId });

    return fastify.getResponseObject(imagem);
  });
};
