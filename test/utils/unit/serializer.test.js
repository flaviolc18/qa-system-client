'use strict';

const { test } = require('tap');
const { serialize, deserialize } = require('../../../src/utils');

test('serialize null', async t => {
  t.same(serialize(), '');
  t.end();
});

test('serialize null', async t => {
  t.same(serialize({ teste: 'a' }), 'teste=a');
  t.same(serialize({ teste1: 'a', teste2: 'b' }), 'teste1=a&teste2=b');
  t.same(serialize({ teste1: 'a', teste2: 'b' }, 'lala'), 'lala=a&lala=b');
  t.same(serialize({ teste1: 'a', teste2: 'b', a: null }, 'lala'), 'lala=a&lala=b&lala=null');

  t.end();
});

test('deserialize null', async t => {
  t.same(deserialize('teste=a'), { teste: 'a' });
  t.same(deserialize(), {});
  t.same(deserialize('='), {});
  t.end();
});
