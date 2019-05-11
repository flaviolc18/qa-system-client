'use strict';

const { test } = require('tap');

const { withDB, isValidObjectId, randomObjectId } = require('../test-helpers');
const seed = require('../../seed');

test(
  'seed.resposta: sem passar usuarioId parametrizado',
  withDB(async t => {
    const { perguntaId: _, ...dadosResposta } = seed.fixtures.resposta();

    delete dadosResposta.usuarioId;

    const { _id, usuarioId, perguntaId, ...createdResposta } = await seed.entidades.resposta(dadosResposta);

    t.strictSame(createdResposta, dadosResposta);
    t.ok(isValidObjectId(usuarioId));

    t.end();
  })
);

test(
  'seed.resposta: sem passar perguntaId parametrizado',
  withDB(async t => {
    const { usuarioId: _, ...dadosResposta } = seed.fixtures.resposta();

    delete dadosResposta.perguntaId;

    const { _id, usuarioId, perguntaId, ...createdResposta } = await seed.entidades.resposta(dadosResposta);

    t.strictSame(createdResposta, dadosResposta);
    t.ok(isValidObjectId(perguntaId));

    t.end();
  })
);

test(
  'seed.resposta: passando usuarioId e um perguntaId parametrizados',
  withDB(async t => {
    const randomUser = randomObjectId();
    const randomQuest = randomObjectId();
    const dadosResposta = seed.fixtures.resposta({ usuarioId: randomUser, perguntaId: randomQuest });

    const { _id, ...createdResposta } = await seed.entidades.resposta(dadosResposta);

    t.strictSame(createdResposta, dadosResposta);

    t.end();
  })
);
