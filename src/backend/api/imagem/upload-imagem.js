'use strict';

module.exports = async function(fastify) {
  fastify.post('/imagem', async function({ body: { nome, data } }) {
    const imagem = await fastify.core.models.imagem.create(nome, data);

    return fastify.getResponseObject(imagem);
  });
};
