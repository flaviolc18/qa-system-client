'use strict';

module.exports = async function(fastify) {
  fastify.get('/imagem/nome/:nome', async function({ params: { nome } }) {
    const imagem = await fastify.core.models.imagem.find({ nome });

    return fastify.getResponseObject(imagem);
  });
};
