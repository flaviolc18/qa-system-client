'use strict';

const SessionModel = require('./session.model');

module.exports = async function(sessionId) {
  const deletedSession = await SessionModel.findByIdAndRemove(sessionId);

  if (!deletedSession) {
    throw new Error('Session não encontrada');
  }

  return deletedSession;
};
