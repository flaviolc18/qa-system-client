'use strict';

module.exports = async function(fastify) {
  fastify.get('/perguntas/search', async function({ query }) {
    //TODO: melhorar o mecanismo de pesquisa
    const filters = [];

    if (query.tags) {
      const tags = await fastify.core.models.tags.findAll({ nome: { $in: query.tags } });

      filters.push({ tags: { $elemMatch: { $in: tags.map(({ _id }) => _id) } } });
    }

    if (query.keyword) {
      filters.push({ titulo: { $regex: query.keyword, $options: 'i' } });
      //filters.push({ descricao: { $regex: query.keyword, $options: 'i' } });
    }

    const perguntas = filters.length ? await fastify.core.models.pergunta.findAll({ $or: filters }) : [];

    return fastify.getResponseObject(perguntas);
  });
};
