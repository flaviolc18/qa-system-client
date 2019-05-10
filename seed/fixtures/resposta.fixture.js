'use strict';

module.exports = ({ usuarioId, perguntaId, ...dadosResposta } = {}) => ({
  descricao: `Então, sua pergunta é muito interessante!

  O período da Baixa Idade Média é geralmente separado em duas fases, sendo uma de expansão e outra de declínio. A primeira fase, que dura do século XI ao século XIII, é caracterizada pela ampliação das culturas agrícolas, renascimento comercial e urbano e crescimento demográfico - em parte causado pela queda nas epidemias conforme tu mencionou. A segunda fase (séculos XIV e XV) é caracterizada por um processo de depressão, decorrente de crises de caráter econômico, político e religioso. As transformações que ocorreram nessas duas fases contribuíram para minar o feudalismo e acabar com o período da Idade Média, dando início ao período da Idade Moderna.`,
  upvotes: 5,
  downvotes: 0,
  dataCriacao: new Date(),
  usuarioId,
  perguntaId,
  ...dadosResposta,
});
