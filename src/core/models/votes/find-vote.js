'use strict';

const VotesModel = require('./votes.model');

module.exports = query => {
  return VotesModel.findOne(query);
};
