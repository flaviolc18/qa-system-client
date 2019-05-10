'use strict';

const { mongoose } = require('../../database');

const ObjectId = mongoose.Schema.Types.ObjectId;

const perguntaSchema = mongoose.Schema({
  titulo: String,
  descricao: String,
  upvotes: Number,
  downvotes: Number,
  usuarioId: ObjectId,
  dataCriacao: Date,
});

module.exports = mongoose.model('Pergunta', perguntaSchema);
