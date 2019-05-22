'use strict';

const { mongoose } = require('../../database');
const ObjectId = mongoose.Schema.Types.ObjectId;

const respostaSchema = mongoose.Schema({
  descricao: String,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  usuarioId: ObjectId,
  perguntaId: ObjectId,
  dataCriacao: Date,
});

module.exports = mongoose.model('Resposta', respostaSchema);
