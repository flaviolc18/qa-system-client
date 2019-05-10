'use strict';

const { test } = require('tap');

const { withDB, isValidObjectId, randomObjectId } = require('../test-helpers');
const seed = require('../../seed');

test(
  'seed.pergunta: sem passar usuarioId parametrizado',
  withDB(async t => {
    const dadosPergunta = seed.fixtures.pergunta();

    delete dadosPergunta.usuarioId;

    const { _id, usuarioId, ...createdPergunta } = await seed.entidades.pergunta(dadosPergunta);

    t.strictSame(createdPergunta, dadosPergunta);
    t.ok(isValidObjectId(usuarioId));

    t.end();
  })
);

test(
  'seed.pergunta: passando usuarioId parametrizado',
  withDB(async t => {
    const randomId = randomObjectId();
    const dadosPergunta = seed.fixtures.pergunta({ usuarioId: randomId });

    const { _id, ...createdPergunta } = await seed.entidades.pergunta(dadosPergunta);

    t.strictSame(createdPergunta, dadosPergunta);

    t.end();
  })
);
