'use strict';

const { test } = require('tap');

const { withDB } = require('../../test-helpers');
const seed = require('../../../seed');

const core = require('../../../src/core');

test(
  'model.pergunta.delete: deleta o usuario e todos os seus dados relacionados',
  withDB(async t => {
    const {
      usuarios: [usuario],
      perguntas,
      respostas,
    } = await seed.cenarios.padrao({ numUsuarios: 1, numPerguntas: 3, numRespostas: 3 });

    await core.models.usuario.delete({ _id: usuario._id });

    const perguntasIds = perguntas.map(({ _id }) => _id);
    const respostasIds = respostas.map(({ _id }) => _id);

    t.same(perguntasIds.length, 3);
    t.same(respostasIds.length, 3);

    t.same((await core.models.pergunta.findAll({ _id: { $in: perguntasIds } })).length, 0);
    t.same((await core.models.resposta.findAll({ _id: { $in: respostasIds } })).length, 0);

    t.notOk(await core.models.usuario.find({ _id: usuario._id }));

    await t.end();
  })
);
