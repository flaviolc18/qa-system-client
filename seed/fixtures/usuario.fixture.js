'use strict';

module.exports = (dadosUsuario = {}) => ({
  username: 'usuarioTeste',
  email: 'usuarioTeste@gmail.com',
  password: 'passwordTeste123',
  descricao: 'uma descrição qualquer apenas para teste',
  reputacao: 100,
  profilePicture: 'base64:://asdkajsdkljhsalkjfhuiafh8934u5y82726cn8246d/97847rnn903287rndxibk56897c4n6',
  ...dadosUsuario,
});
