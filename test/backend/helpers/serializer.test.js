'use strict';

const { test } = require('tap');
const { serialize, deserialize } = require('../../../src/backend/helpers/serializer');

test('serialize null', async t => {
  t.same(serialize(), '');
  t.end();
});

test('serialize null', async t => {
  t.same(serialize({ teste: 'a' }), 'teste=a');
  t.same(serialize({ teste: 'a', b: { c: 'd' } }), 'teste=a&b%5Bc%5D=d');
  t.same(serialize({ teste1: 'a', teste2: 'b' }), 'teste1=a&teste2=b');
  t.same(serialize({ teste1: 'a', teste2: 'b' }, 'lala'), 'lala%5Bteste1%5D=a&lala%5Bteste2%5D=b');
  t.same(
    serialize({ teste1: 'a', teste2: 'b', a: null }, 'lala'),
    'lala%5Bteste1%5D=a&lala%5Bteste2%5D=b&lala%5Ba%5D=null'
  );

  t.end();
});

test('deserialize null', async t => {
  t.same(deserialize('teste=a'), { teste: 'a' });
  t.end();
});
