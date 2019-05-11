'use strict';

/* eslint no-unused-vars:0 */

module.exports = async function(fastify) {
  fastify.post('/usuarios/:usuarioId/upload', {}, async function(req, reply) {
    const { usuarioId } = req.params;

    const usuario = await fastify.core.models.usuario.find({ _id: usuarioId });

    if (!usuario) {
      throw fastify.httpErrors.notFound();
    }

    req.multipart(
      async function handler(field, file, filename, encoding, mimetype) {
        const bufferArray = [];

        file.on('data', chunk => bufferArray.push(chunk));
        file.on('end', async () => {
          const profilePicture = Buffer.concat(bufferArray);

          const updatedUsuario = await fastify.core.models.usuario.update({ _id: usuarioId }, { profilePicture });

          reply.code(200).send(updatedUsuario);
        });
      },
      function(erro = '') {
        if (erro) {
          reply.code(200).send({ erro: erro.toString() });
        }
      }
    );
  });
};
