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

test(
  'model.pergunta.update: atualiza o array de tags',
  withDB(async t => {
    const pergunta = await seed.entidades.pergunta();
    const tagNames = ['teste1', 'teste2'];
    const alteracoes = { tags: tagNames };

    const {
      _doc: { tags },
    } = await core.models.pergunta.update({ _id: pergunta._id }, alteracoes);

    (await Promise.all(tags.map(async tagId => core.models.tags.find(tagId)))).forEach(
      ({ nome, quantidadeUsos }, index) => {
        t.same(nome, tagNames[index]);
        t.same(quantidadeUsos, 1);
      }
    );

    t.end();
  })
);

test(
  'model.pergunta.deleteMany: deleta várias perguntas e suas respostas relacionadas',
  withDB(async t => {
    const cenario = await seed.cenarios.padrao({ numUsuarios: 2, numPerguntas: 3, numRespostas: 6 });

    const perguntasIds = cenario.perguntas.map(({ _id }) => _id);

    await core.models.pergunta.deleteMany({ _id: { $in: perguntasIds } });

    const foundPerguntas = await core.models.pergunta.findAll({});
    const foundRespostas = await core.models.resposta.findAll({});

    t.same(foundPerguntas.length, 0);
    t.same(foundRespostas.length, 0);

    await t.end();
  })
);
