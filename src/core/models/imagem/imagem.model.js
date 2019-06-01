'use strict';

const { mongoose } = require('../../database');

const imagemSchema = mongoose.Schema({
  nome: String,
  buffer: Buffer,
  dataCriacao: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Imagem', imagemSchema);
