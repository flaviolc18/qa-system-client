'use strict';

const { mongoose } = require('../../database');
const ObjectId = mongoose.Schema.Types.ObjectId;

const respostaSchema = mongoose.Schema({
  descricao: String,
  upvotes: Number,
  downvotes: Number,
  usuarioId: ObjectId,
  perguntaId: ObjectId,
  dataCriacao: Date,
});

module.exports = mongoose.model('Resposta', respostaSchema);
