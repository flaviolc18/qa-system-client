'use strict';

const path = require('path');
const fs = require('fs');
const { test } = require('tap');

const { withDB } = require('../../test-helpers');
const seed = require('../../../seed');

const core = require('../../../src/core');

const { nomeInitialImage } = require('../../../src/utils');

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

test(
  'model.usuario.create: usuario com imagem inicial',
  withDB(async t => {
    const usuarioData = seed.fixtures.usuario();

    fs.readFile(path.join(__dirname, '../../../images/initial.png'), async (err, data) => {
      if (err) {
        throw err;
      }
      const buffer = Buffer.from(data);

      const initialImage = await core.models.imagem.create(nomeInitialImage, buffer);
      const usuario = await core.models.usuario.create(usuarioData);
      const {
        _doc: { _id, __v, password, ...createdUsuario },
      } = usuario;

      t.same(createdUsuario.imagemId, initialImage._id);

      t.end();
    });
  })
);
