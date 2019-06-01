'use strict';

const PerguntaModel = require('./pergunta.model');

module.exports = function(pipeline) {
  return PerguntaModel.aggregate(pipeline);
};
