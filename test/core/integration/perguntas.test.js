'use strict';

const { test } = require('tap');

const { withDB } = require('../../test-helpers');
const seed = require('../../../seed');

const core = require('../../../src/core');

test(
  'model.pergunta.delete: deleta as respostas relacionadas as perguntas',
  withDB(async t => {
    const pergunta = await seed.entidades.pergunta();

    await seed.entidades.resposta({ perguntaId: pergunta._id });
    await seed.entidades.resposta({ perguntaId: pergunta._id });

    const respostasFromPergunta = await core.models.resposta.findAll({ perguntaId: pergunta._id });

    t.same(respostasFromPergunta.length, 2);

    const {
      _doc: { __v, ...deletedPergunta },
    } = await core.models.pergunta.delete({ _id: pergunta._id });

    t.strictSame(deletedPergunta, pergunta);

    const respostasFromDeletedPergunta = await core.models.resposta.findAll({ perguntaId: deletedPergunta._id });

    t.same(respostasFromDeletedPergunta.length, 0);

    await t.end();
  })
);
