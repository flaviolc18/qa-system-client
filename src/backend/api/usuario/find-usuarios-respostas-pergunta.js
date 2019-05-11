'use strict';

const usuarioSchema = require('./usuario.schema');

module.exports = async function(fastify) {
  const schemaHelper = fastify.schemaHelper(usuarioSchema);

  fastify.get(
    '/usuarios/perguntas/:perguntaId/respostas',
    schemaHelper.findAll('usuario.findAll.pergunta.resposta'),
    async function({ params: { perguntaId } }) {
      const pergunta = await fastify.core.models.pergunta.find({ _id: perguntaId });

      if (!pergunta) {
        throw fastify.httpErrors.notFound();
      }

      const respostas = await fastify.core.models.resposta.findAll({ perguntaId: pergunta._id });

      const usuarios = await fastify.core.models.usuario.findAll({
        _id: { $in: respostas.map(({ usuarioId }) => usuarioId) },
      });

      return fastify.getResponseObject(usuarios);
    }
  );
};
