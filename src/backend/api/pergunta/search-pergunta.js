'use strict';

const { deserialize } = require('../../helpers/serializer');

module.exports = async function(fastify) {
  fastify.get('/perguntas/search/:filter', {}, async function({ params: { filter: search } }) {
    const filter = deserialize(search);

    if (filter.tags) {
      let tags = filter.tags;

      if (!Array.isArray(tags)) {
        tags = tags.split(',');

        tags = tags.filter(tag => tag !== '');

        tags = tags.map(tag => {
          if (tag[0] === ' ') {
            return tag.slice(1);
          }

          return tag;
        });

        tags = [...new Set(tags)];
      }

      filter.tags = { $elemMatch: { $in: tags } };
    }

    const perguntas = await fastify.core.models.pergunta.find(filter).sort({ upvotes: 1 });

    if (!perguntas) {
      throw fastify.httpErrors.notFound();
    }

    return fastify.getResponseObject(perguntas);
  });
};
