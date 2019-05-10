'use strict';

module.exports = async function(fastify) {
  fastify.get('/perguntas/:perguntaId/respostas/usuarios', {}, async function({ params: { perguntaId } }) {
    const pergunta = await fastify.core.models.pergunta.find({ _id: perguntaId });

    if (!pergunta) {
      throw fastify.httpErrors.notFound();
    }

    const respostas = await fastify.core.models.resposta.findAll({ perguntaId: pergunta._id });

    const usuarios = await fastify.core.models.usuario.findAll({
      _id: { $in: respostas.map(({ usuarioId }) => usuarioId) },
    });

    return { elements: usuarios, total: usuarios.length };
  });
};
