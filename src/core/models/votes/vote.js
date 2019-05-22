'use strict';

const perguntaCore = require('../pergunta');
const respostaCore = require('../resposta');
const usuarioCore = require('../usuario');

const VotesModel = require('./votes.model');

module.exports = async function({ postId, usuarioId, vote }) {
  let post;
  let postCore;

  if ((post = await perguntaCore.find({ _id: postId }))) {
    postCore = perguntaCore;
  } else if ((post = await respostaCore.find({ _id: postId }))) {
    postCore = respostaCore;
  } else {
    throw new Error('Referência para post inválida');
  }

  const usuario = await usuarioCore.find({ _id: usuarioId });

  if (!usuario) {
    throw new Error('Referência para usuário inválida');
  }

  const haveUsuarioVoted = await VotesModel.findOne({ postId, usuarioId });

  if (haveUsuarioVoted) {
    throw new Error('Usuário não pode votar novamente no mesmo post');
  }

  const voteModel = new VotesModel({ vote, date: new Date(), usuarioId, postId });

  await voteModel.save();

  await postCore.update({ _id: postId }, { vote: post.vote + vote });
};
