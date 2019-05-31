'use strict';

const { mongoose } = require('../../database');

const tagSchema = mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  descricao: String,
  quantidadeUsos: { type: Number, default: 0 },
  dataCriacao: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tag', tagSchema);
