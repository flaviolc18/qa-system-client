'use strict';

const alphanumerics = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

exports.generateRandomAlphanumeric = generateRandomAlphanumeric;
exports.getRandomNumber = getRandomNumber;
exports.getRandomItem = getRandomItem;

function generateRandomAlphanumeric(min, max) {
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
