'use strict';

const { mongoose } = require('../../database');

const ObjectId = mongoose.Schema.Types.ObjectId;

const perguntaSchema = mongoose.Schema({
  titulo: String,
  descricao: String,
  vote: { type: Number, default: 0 },
  usuarioId: ObjectId,
  dataCriacao: Date,
});

module.exports = mongoose.model('Pergunta', perguntaSchema);
