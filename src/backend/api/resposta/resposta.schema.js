'use strict';

module.exports = {
  object: {
    type: 'object',
    properties: {
      descricao: {
        type: 'string',
        description: 'Texto da resposta',
      },
      upvotes: {
        type: 'number',
        description: 'Número de upvotes da resposta',
      },
      downvotes: {
        type: 'number',
        description: 'Número de downvotes da resposta',
      },
      usuarioId: {
        type: 'string',
        description: 'Id do usuario que postou a resposta',
      },
      perguntaId: {
        type: 'string',
        description: 'Id da pergunta a qual a resposta está associada',
      },
    },
  },
  params: {
    type: 'object',
    properties: {
      respostaId: {
        type: 'string',
        description: 'Id da resposta',
      },
    },
    required: ['respostaId'],
  },
};
