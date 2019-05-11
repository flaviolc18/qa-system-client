'use strict';

const { test } = require('tap');

const { initServer } = require('../../test-helpers');

const genericSchema = {
  object: {
    type: 'object',
    properties: {
      prop: {
        type: 'string',
        description: 'Um atributo qualquer',
      },
    },
  },
  params: {
    type: 'object',
    properties: {
      testId: {
        type: 'string',
        description: 'Id da entidade de teste',
      },
    },
    required: ['testId'],
  },
};

const testCases = [
  {
    operation: 'create',
    operationDescription: 'create scheme',
    expectedSchema: {
      schema: {
        description: 'create scheme',
        body: genericSchema.object,
        response: {
          200: {
            type: 'object',
            properties: {
              elements: {
                type: 'array',
                items: addIdToObject(genericSchema.object),
              },
              total: { type: 'number' },
            },
          },
        },
      },
    },
  },
  {
    operation: 'find',
    operationDescription: 'find scheme',
    expectedSchema: {
      schema: {
        description: 'find scheme',
        params: genericSchema.params,
        response: {
          200: {
            type: 'object',
            properties: {
              elements: {
                type: 'array',
                items: addIdToObject(genericSchema.object),
              },
              total: { type: 'number' },
            },
          },
        },
      },
    },
  },
  {
    operation: 'update',
    operationDescription: 'update scheme',
    expectedSchema: {
      schema: {
        description: 'update scheme',
        params: genericSchema.params,
        body: {
          ...genericSchema.object,
          required: [],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              elements: {
                type: 'array',
                items: addIdToObject(genericSchema.object),
              },
              total: { type: 'number' },
            },
          },
        },
      },
    },
  },
  {
    operation: 'delete',
    operationDescription: 'delete scheme',
    expectedSchema: {
      schema: {
        description: 'delete scheme',
        params: genericSchema.params,
        response: {
          200: {
            type: 'object',
            properties: {
              elements: {
                type: 'array',
                items: addIdToObject(genericSchema.object),
              },
              total: { type: 'number' },
            },
          },
        },
      },
    },
  },
  {
    operation: 'findAll',
    operationDescription: 'findAll scheme',
    expectedSchema: {
      schema: {
        description: 'findAll scheme',
        response: {
          200: {
            type: 'object',
            properties: {
              elements: {
                type: 'array',
                items: addIdToObject(genericSchema.object),
              },
              total: { type: 'number' },
            },
          },
        },
      },
    },
  },
];

for (const { operation, operationDescription, expectedSchema } of testCases) {
  test(`schema-helper.${operation}: deve conter todas os atributos de schema`, async t => {
    const fastify = await initServer(t);

    const schema = fastify.schemaHelper(genericSchema)[operation](operationDescription);

    t.strictSame(schema, expectedSchema);
    t.end();
  });
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
