'use strict';

module.exports = (dadosUsuario = {}) => ({
  username: 'usuarioTeste',
  email: 'usuarioTeste@gmail.com',
  password: 'passwordTeste123',
  descricao: 'uma descrição qualquer apenas para teste',
  reputacao: 100,
  ...dadosUsuario,
});
