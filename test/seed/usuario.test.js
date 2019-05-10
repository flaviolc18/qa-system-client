'use strict';

const { skip } = require('tap');

const { withDB } = require('../test-helpers');
const seed = require('../../seed');

skip(
  'seed.usuario',
  withDB(async t => {
    const dadosUsuario = seed.fixtures.usuario();
    const { password: _, ...usuarioDataWithoutPass } = dadosUsuario;

    const { _id, __v, password, ...createdUsuario } = await seed.entidades.usuario(dadosUsuario);

    t.strictSame(createdUsuario, usuarioDataWithoutPass);

    t.end();
  })
);
