'use strict';

const { generateRandomAlphanumeric } = require('../../src/utils');

module.exports = (dadosUsuario = {}) => ({
  username: generateRandomAlphanumeric(5, 15),
  email: `${generateRandomAlphanumeric(5, 15)}@gmail.com`,
  password: 'passwordTeste123',
  descricao: 'uma descrição qualquer apenas para teste',
  reputacao: 100,
  ...dadosUsuario,
});
