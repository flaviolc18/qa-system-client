'use strict';

const { test } = require('tap');

const { initServer } = require('../../test-helpers');

const testCases = [
  {
    description: 'array de elementos',
    elementsP: [{ a: 1, b: 2 }, { a: 3, b: 4 }],
    expectedResult: { elements: [{ a: 1, b: 2 }, { a: 3, b: 4 }], total: 2 },
  },
  {
    description: 'elemento único',
    elementsP: { a: 1, b: 2 },
    expectedResult: { elements: [{ a: 1, b: 2 }], total: 1 },
  },
  {
    description: 'elemento objeto vazio',
    elementsP: {},
    expectedResult: {},
  },
  {
    description: 'elemento undefined',
    elementsP: undefined,
    expectedResult: undefined,
  },
];

for (const { description, expectedResult, elementsP } of testCases) {
  test(`get-response-object: ${description}`, async t => {
    const fastify = await initServer(t);

    const result = fastify.getResponseObject(elementsP);

    t.strictSame(result, expectedResult);
    t.end();
  });
}
