'use strict';

const fp = require('fastify-plugin');

module.exports = fp(function(fastify, opt, next) {
  fastify.decorate('schemaHelper', schemaHelper);
  next();
});

function schemaHelper(schema) {
  return {
    create(operationDescription) {
      return {
        schema: {
          description: operationDescription,
          body: schema.object,
          response: {
            200: addIdToObject(schema.object),
          },
        },
      };
    },

    find(operationDescription) {
      return {
        schema: {
          description: operationDescription,
          params: schema.params,
          response: {
            200: addIdToObject(schema.object),
          },
        },
      };
    },

    update(operationDescription) {
      return {
        schema: {
          description: operationDescription,
          params: schema.params,
          body: {
            ...schema.object,
            required: [],
          },
          response: {
            200: addIdToObject(schema.object),
          },
        },
      };
    },

    delete(operationDescription) {
      return {
        schema: {
          description: operationDescription,
          params: schema.params,
          response: {
            200: addIdToObject(schema.object),
          },
        },
      };
    },

    findAll(operationDescription) {
      return {
        schema: {
          description: operationDescription,
          response: {
            200: {
              type: 'array',
              items: addIdToObject(schema.object),
            },
          },
        },
      };
    },
  };
}

function addIdToObject(object) {
  return {
    ...object,
    properties: {
      _id: {
        type: 'string',
      },
      ...object.properties,
    },
  };
}
