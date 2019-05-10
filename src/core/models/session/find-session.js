'use strict';

const SessionModel = require('./session.model');
const deleteSession = require('./delete-sessions');

module.exports = async function(sessionId) {
  const session = await SessionModel.findById(sessionId);

  if (!session) {
    return;
  }

  if (session.dataExpiracao < new Date()) {
    await deleteSession(sessionId);

    return;
  }

  return session;
};
