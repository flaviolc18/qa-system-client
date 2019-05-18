'use strict';

const ImagemModel = require('./imagem.model');

module.exports = async function(nome, buffer) {
  const dataCriacao = new Date();

  const imagem = new ImagemModel({
    nome,
    buffer,
    dataCriacao,
  });

  return imagem.save();
};
