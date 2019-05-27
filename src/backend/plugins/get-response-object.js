'use strict';

const fp = require('fastify-plugin');

module.exports = fp(function(fastify, opt, next) {
  fastify.decorate('getResponseObject', getResponseObject);
  next();
});

function getResponseObject(elements) {
  if (Array.isArray(elements)) {
    return { elements, total: elements.length };
  }

  if (typeof elements === 'object' && elements && Object.keys(elements).length !== 0) {
    return { elements: [elements], total: 1 };
  }

  return { elements: [], total: 0 };
}
