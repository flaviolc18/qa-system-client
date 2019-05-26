'use strict';

const { deserialize } = require('../../helpers/serializer');

module.exports = async function(fastify) {
  fastify.get('/perguntas/search/:filter', {}, async function({ params: { filter: search } }) {
    const filter = deserialize(search);

    if (filter.tags) {
      let tags = filter.tags;

      tags = tags.split(',');

      tags = tags.filter(tag => tag !== '' && tag !== ' ');

      tags = tags.map(tag => {
        if (tag[0] === ' ') {
          return tag.slice(1);
        }

        return tag;
      });

      tags = [...new Set(tags)];

      filter.tags = { $elemMatch: { $in: tags } };
    }

    if (filter.titulo) {
      filter.titulo = { $regex: filter.titulo, $options: 'i' };
    }

    const perguntas = await fastify.core.models.pergunta.findAll(filter).sort({ upvotes: 1 });

    return fastify.getResponseObject(perguntas);
  });
};
