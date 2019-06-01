'use strict';

const ImagemModel = require('./imagem.model');

module.exports = function(query) {
  return ImagemModel.findOne(query);
};
