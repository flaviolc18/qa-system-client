'use strict';

const PerguntaModel = require('./pergunta.model');

module.exports = function(query, options) {
  return PerguntaModel.find(query, null, options);
};
