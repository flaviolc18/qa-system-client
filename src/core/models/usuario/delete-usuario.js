'use strict';

const UsuarioModel = require('./usuario.model');
const SessionModel = require('../session/session.model');
const ImagemModel = require('../imagem/imagem.model');
const deleteManyPergunta = require('../pergunta/delete-many-perguntas');
const deleteManyResposta = require('../resposta/delete-many-respostas');
const deleteManyVotes = require('../votes/delete-many-votes');

module.exports = async function(query) {
  const deletedUsuario = await UsuarioModel.findOneAndRemove(query);

  if (!deletedUsuario) {
    throw new Error('Usuário não encontrado');
  }

  await SessionModel.deleteOne({ usuarioId: deletedUsuario._id });
  await ImagemModel.deleteOne({ _id: deletedUsuario.imagemId });
  await deleteManyPergunta({ usuarioId: deletedUsuario._id });
  await deleteManyResposta({ usuarioId: deletedUsuario._id });
  await deleteManyVotes({ usuarioId: deletedUsuario._id });

  return deletedUsuario;
};
