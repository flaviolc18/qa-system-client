'use strict';

const ImagemModel = require('./imagem.model');

module.exports = async function(nome, buffer) {
  const imagem = new ImagemModel({
    nome,
    buffer,
  });

  return imagem.save();
};
