'use strict';

const { mongoose } = require('../../database');

const ObjectId = mongoose.Schema.Types.ObjectId;

const votesSchema = mongoose.Schema({
  vote: {
    type: Number,
    validate: {
      validator: v => v === 1 || v === -1,
      message: 'value must be 1 or -1',
    },
  },
  date: { type: Date, default: Date.now },
  usuarioId: ObjectId,
  postId: ObjectId,
});

module.exports = mongoose.model('Votes', votesSchema);
