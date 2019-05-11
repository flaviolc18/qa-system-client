'use strict';

module.exports = {
  object: {
    type: 'object',
    properties: {
      usuarioId: {
        type: 'string',
        description: 'Id do usuario a qual a session pertence',
      },
      dataCriacao: {
        type: 'string',
        description: 'Id do usuario a qual a session pertence',
      },
      dataExpiracao: {
        type: 'string',
        description: 'Data de expiração da session',
      },
      params: {
        type: 'object',
        properties: {
          sessionId: {
            type: 'string',
            description: 'Id da session',
          },
        },
        required: ['sessionId'],
      },
    },
  },
};
