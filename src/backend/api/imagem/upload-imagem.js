'use strict';

module.exports = async function(fastify) {
  fastify.post('/imagem', async function({ body: { nome, buffer } }) {
    const imagem = await fastify.core.models.imagem.create(nome, buffer);

    return fastify.getResponseObject(imagem);
  });
};
