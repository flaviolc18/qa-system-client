'use strict';

const ImagemModel = require('./imagem.model');

module.exports = async function(imagemId) {
  const findedImagem = await ImagemModel.findOne(imagemId);

  return findedImagem;
};
