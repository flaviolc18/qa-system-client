'use strict';

const ImagemModel = require('./imagem.model');

module.exports = async function(imagemId) {
  const deletedImagem = await ImagemModel.findByIdAndRemove(imagemId);

  if (!deletedImagem) {
    throw new Error('Imagem não encontrada');
  }

  return deletedImagem;
};
