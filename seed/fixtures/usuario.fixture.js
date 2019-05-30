'use strict';

module.exports = (dadosUsuario = {}) => ({
  username: generateRandomUsername(5, 15),
  email: `${generateRandomUsername(5, 15)}@gmail.com`,
  password: 'passwordTeste123',
  descricao: 'uma descrição qualquer apenas para teste',
  reputacao: 100,
  ...dadosUsuario,
});

const alphanumerics = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateRandomUsername(min, max) {
  let text = '';

  for (let i = 0; i < getRandomNumber(min, max); i++) {
    text += getRandomItem(alphanumerics);
  }

  return text;
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(arrayLike) {
  return arrayLike[getRandomNumber(0, arrayLike.length - 1)];
}
