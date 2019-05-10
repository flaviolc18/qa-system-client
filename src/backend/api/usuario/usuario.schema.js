'use strict';

module.exports = {
  object: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'Nome do usuário',
      },
      email: {
        type: 'string',
        description: 'Email do usuário',
      },
      password: {
        type: 'string',
        description: 'Senha de usuário',
      },
      descricao: {
        type: 'string',
        description: 'Descrição do usuário',
      },
      reputacao: {
        type: 'number',
        description: 'reputacao do usuário',
      },
      profilePicture: {
        type: 'string',
        description: 'profile picture em base 64',
      },
    },
    params: {
      type: 'object',
      properties: {
        usuarioId: {
          type: 'string',
          description: 'Id do usuário',
        },
      },
      required: ['usuarioId'],
    },
  },
};
