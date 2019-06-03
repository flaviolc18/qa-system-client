'use strict';

// isso é uma gambiarra, devido a falta de tempo para entrega do trabalho tive q fazer essa obra de arte, assim q passar a apresentação mudarei

const path = require('path');
const fs = require('fs');

const fastifyAutoLoad = require('fastify-autoload');
const fastifyCircuitBreaker = require('fastify-circuit-breaker');
const fastifyCookie = require('fastify-cookie');
const fastifyCors = require('fastify-cors');
const fastifyEnv = require('fastify-env');
const fastifyHelmet = require('fastify-helmet');
const fastifyMultipart = require('fastify-multipart');
const fastifyPlugin = require('fastify-plugin');
const fastifySensible = require('fastify-sensible');
const fastifyStatic = require('fastify-static');

const core = require('../core');

const { default: render } = require('../../dist/app.ssr');

const { nomeInitialImage } = require('../utils');

/* eslint no-unused-vars:0 */
module.exports = async function(fastify, opts) {
  fastify.register(fastifyEnv, {
    schema: {
      type: 'object',
      required: ['PORT', 'NODE_ENV'],
      properties: {
        PORT: {
          type: 'string',
          default: 3000,
        },
        NODE_ENV: {
          type: 'string',
          default: 'development',
        },
      },
    },
  });

  fastify.decorate('core', core);

  fastify.register(fastifyStatic, {
    root: path.join(__dirname, '../../dist'),
    prefix: '/assets',
  });

  fastify.register(
    fastifyPlugin(async function() {
      await core.database.connect();

      fastify.addHook('onClose', () => core.database.disconnect());
    })
  );
  fastify.register(fastifyMultipart);

  fastify.register(fastifyCircuitBreaker);
  fastify.register(fastifySensible);

  fastify.register(fastifyCors, { credentials: true, origin: true });

  fastify.register(fastifyCookie);

  fastify.register(fastifyHelmet, { hidePoweredBy: { setTo: 'PHP 4.2.0' } });

  fastify.register(fastifyAutoLoad, {
    dir: path.join(__dirname, 'plugins'),
  });

  fastify.register(fastifyAutoLoad, {
    dir: path.join(__dirname, 'api'),
    options: { prefix: '/api' },
  });

  fastify.get('/api/*', async () => {
    throw fastify.httpErrors.notFound();
  });

  fastify.get('/*', async (req, res) =>
    res.header('Content-Type', 'text/html; charset=utf-8').send(render(req.raw.url))
  );

  fastify.ready().then(async fastify => {
    const initialImage = await fastify.core.models.imagem.find({ nome: nomeInitialImage });

    if (!initialImage) {
      fs.readFile(path.join(__dirname, '../../images/initial.png'), async (err, data) => {
        if (err) {
          throw err;
        }
        const buffer = Buffer.from(data);

        await fastify.core.models.imagem.create(nomeInitialImage, buffer);
      });
    }
  });
};
