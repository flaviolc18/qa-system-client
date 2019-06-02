'use strict';

const { test } = require('tap');

const { withDB } = require('../test-helpers');
const seed = require('../../seed');

test(
  'seed.cenarios.padrao',
  withDB(async t => {
    const numUsuarios = 2;
    const numPerguntas = 3;
    const numRespostas = 4;

    const cenario = await seed.cenarios.padrao({ numUsuarios: 2, numPerguntas: 3, numRespostas: 4 });

    const { usuarios, perguntas, respostas } = cenario;

    t.same(usuarios.length, numUsuarios);
    t.same(perguntas.length, numPerguntas);
    t.same(respostas.length, numRespostas);

    t.end();
  })
);
