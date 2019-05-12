'use strict';

const ImagemModel = require('./imagem.model');

module.exports = async function(query) {
  const findedImagems = await ImagemModel.find(query);

  return findedImagems;
};
