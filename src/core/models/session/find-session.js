'use strict';

const SessionModel = require('./session.model');

module.exports = async function(sessionId) {
  const session = await SessionModel.findById(sessionId);

  return session;
};
