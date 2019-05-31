'use strict';

const RespostaModel = require('./resposta.model');

module.exports = function(query, options) {
  return RespostaModel.find(query, null, options);
};
