'use strict';

const { mongoose } = require('../../database');

const { ObjectId } = mongoose.Schema.Types;

const sessionSchema = mongoose.Schema({
  usuarioId: ObjectId,
  dataCriacao: Date,
  dataExpiracao: Date,
});

module.exports = mongoose.model('Session', sessionSchema);
