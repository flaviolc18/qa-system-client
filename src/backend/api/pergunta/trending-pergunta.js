'use strict';

const schema = { querystring: { skip: { type: 'integer' }, limit: { type: 'integer' } } };

module.exports = async function(fastify) {
  fastify.get('/perguntas/trending', { schema }, async function({ query: { skip = 0, limit = 10 } }) {
    const yesterday = new Date();

    yesterday.setDate(new Date().getDate() - 1);

    const pipeline = [
      { $match: { dataCriacao: { $gte: yesterday } } },
      { $addFields: { sort_order: { $add: ['$upvotes', '$downvotes'] } } },
      { $sort: { sort_order: -1 } },
      { $skip: skip },
      { $limit: limit },
      { $project: { sort_order: 0 } },
    ];

    const perguntas = await fastify.core.models.pergunta.aggregate(pipeline);

    return fastify.getResponseObject(perguntas);
  });
};
