'use strict';

const path = require('path');
const fs = require('fs');
const Fastify = require('fastify');

const server = require('./src/backend/server');

const { nomeInitialImage } = require('./src/utils');

const fastify = Fastify({
  pluginTimeout: 10000,
});

server(fastify);

fastify.ready().then(async fastify => {
  const initialImage = await fastify.core.models.imagem.find({ nome: nomeInitialImage });

  if (!initialImage) {
    fs.readFile(path.join(__dirname, './images/initial.png'), async (err, data) => {
      if (err) {
        throw err;
      }
      const buffer = Buffer.from(data);

      await fastify.core.models.imagem.create(nomeInitialImage, buffer);
    });
  }
});

fastify.listen(process.env.PORT || 3000, '0.0.0.0', err => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
