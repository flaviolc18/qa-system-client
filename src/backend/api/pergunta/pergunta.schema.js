'use strict';

module.exports = {
  object: {
    type: 'object',
    properties: {
      titulo: {
        type: 'string',
        description: 'Breve descrição da pergunta',
      },
      descricao: {
        type: 'string',
        description: 'Texto da pergunta',
      },
      dataCriacao: {
        type: 'string',
        description: 'Data de criação da pergunta',
      },
      upvotes: {
        type: 'number',
        description: 'Número de upvotes da pergunta',
      },
      downvotes: {
        type: 'number',
        description: 'Número de downvotes da pergunta',
      },
      usuarioId: {
        type: 'string',
        description: 'Id do usuario que postou a pergunta',
      },
    },
  },
  params: {
    type: 'object',
    properties: {
      perguntaId: {
        type: 'string',
        description: 'Id da pergunta',
      },
    },
    required: ['perguntaId'],
  },
};
