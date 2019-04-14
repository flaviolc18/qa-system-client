const path = require('path');

/* eslint no-unused-vars:0 */
module.exports = async function(fastify, opts) {
  fastify.register(require('fastify-static'), {
    root: path.join(__dirname, '../../dist'),
    prefix: '/assets',
  });

  fastify.register(require('fastify-cookie'));

  fastify.get('/*', require('./server-side-rendering/handle-render'));
};
