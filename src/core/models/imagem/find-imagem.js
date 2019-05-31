'use strict';

const ImagemModel = require('./imagem.model');

module.exports = async function(query) {
  const findedImagem = await ImagemModel.findOne(query);

  return findedImagem;
};
