'use strict';

module.exports = ({ usuarioId, ...dadosPergunta } = {}) => ({
  titulo: 'Não tenho a menor ideia de como era a Baixa Idade Média',
  descricao: `Olá,

  Tenho uma dúvida sobre a Baixa Idade Média. O professor falou sobre nesse período haver a queda das epidemias, devido as pessoas estarem concentrados nos feudos, e por isso não havia contato com outros povos que pudessem passar doenças.
  Mas não é na Baixa Idade Média que ocorre o processo de descentralização dos feudos? devido o comércio e a urbanização, e por isso o feudalismo começa a ruir?
  
  Desde já, obrigada.`,
  dataCriacao: new Date(),
  upvotes: 14,
  downvotes: 11,
  usuarioId,
  ...dadosPergunta,
});
