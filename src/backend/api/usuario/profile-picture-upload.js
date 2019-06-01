'use strict';

/* eslint no-unused-vars:0 */

module.exports = async function(fastify) {
  fastify.post('/usuarios/:usuarioId/upload', async function(req, res) {
    const { usuarioId } = req.params;

    const usuario = await fastify.core.models.usuario.find({ _id: usuarioId });

    if (!usuario) {
      throw fastify.httpErrors.notFound('Referência para usuário inválida');
    }

    req.multipart(
      //TODO: validação do mimetype

      async function handler(field, file, filename, encoding, mimetype) {
        const bufferArray = [];

        file.on('data', chunk => {
          bufferArray.push(chunk);
        });
        file.on('end', async () => {
          const profilePicture = Buffer.concat(bufferArray);

          const { _id: imagemId } = await fastify.core.models.imagem.create(filename, profilePicture);

          const updatedUsuario = await fastify.core.models.usuario.update({ _id: usuarioId }, { imagemId });

          res.code(200).send(updatedUsuario);
        });
      },
      function done(error) {
        //FIXME: a função multipart apresentou um comportamento estranho, chamou a função done sem ter chamado o handler e passando error como undifined, isso aconteceu quando no supertest passei o Content-type como application/json

        if (error) {
          res.code(400).send({ error: error.message });
        }
      }
    );
  });
};
