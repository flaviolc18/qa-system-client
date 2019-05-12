'use strict';

const ImagemModel = require('./imagem.model');

module.exports = async function(nome, data) {
  const dataCriacao = new Date();

  const imagem = new ImagemModel({
    nome,
    data,
    dataCriacao,
  });

  return imagem.save();
};
