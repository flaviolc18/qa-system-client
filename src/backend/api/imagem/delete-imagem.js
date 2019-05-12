'use strict';

module.exports = async function(fastify) {
  fastify.delete('/imagem/:imagemId', async function({ params: { imagemId } }) {
    try {
      const imagem = await fastify.core.models.imagem.delete({ _id: imagemId });

      return fastify.getResponseObject(imagem);
    } catch ({ message }) {
      throw fastify.httpErrors.notFound();
    }
  });
};
