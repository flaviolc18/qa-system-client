'use strict';

module.exports = ({ usuarioId, tags = [], ...dadosPergunta } = {}) => ({
  titulo: 'Não tenho a menor ideia de como era a Baixa Idade Média',
  descricao: 'teste descricao',
  dataCriacao: new Date(),
  upvotes: 0,
  downvotes: 0,
  tags,
  usuarioId,
  ...dadosPergunta,
});
