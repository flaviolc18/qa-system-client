'use strict';

const perguntaCore = require('../pergunta');
const respostaCore = require('../resposta');

const VotesModel = require('./votes.model');

module.exports = async function({ postId, usuarioId }) {
  let post;
  let postCore;

  if ((post = await perguntaCore.find({ _id: postId }))) {
    postCore = perguntaCore;
  } else if ((post = await respostaCore.find({ _id: postId }))) {
    postCore = respostaCore;
  }

  const voteDoc = await VotesModel.findOne({ postId, usuarioId });

  if (!voteDoc) {
    throw new Error('Documento "Vote" não encontrado');
  }

  await postCore.update({ _id: postId }, { vote: post.vote - voteDoc.vote });

  await VotesModel.deleteOne({ _id: voteDoc._id });
};
