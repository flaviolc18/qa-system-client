'use strict';

const { mongoose } = require('../../database');

const imagemSchema = mongoose.Schema({
  nome: String,
  buffer: String,
  dataCriacao: Date,
});

module.exports = mongoose.model('Imagem', imagemSchema);
