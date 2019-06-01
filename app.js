'use strict';

const server = require('./src/backend/server');

const Fastify = require('fastify');

const fastify = Fastify({
  pluginTimeout: 10000,
});

server(fastify);

fastify.listen(process.env.PORT || 3000, '0.0.0.0', err => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
