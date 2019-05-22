'use strict';

const perguntaCore = require('../pergunta');
const respostaCore = require('../resposta');
const usuarioCore = require('../usuario');

const VotesModel = require('./votes.model');

module.exports = {
  upvote: async ({ usuarioId, postId }) => {
    await validate({ usuarioId, postId });

    const voteModel = new VotesModel({ vote: 1, date: new Date(), usuarioId, postId });

    await voteModel.save();

    const postCore = await getPostCore(postId);

    await postCore.update({ _id: postId }, { $inc: { upvotes: 1 } });
  },
  downvote: async ({ usuarioId, postId }) => {
    await validate({ usuarioId, postId });

    const voteModel = new VotesModel({ vote: -1, date: new Date(), usuarioId, postId });

    const postCore = await getPostCore(postId);

    await voteModel.save();

    await postCore.update({ _id: postId }, { $inc: { downvotes: 1 } });
  },

  unvote: async ({ postId, usuarioId }) => {
    const voteDoc = await VotesModel.findOne({ postId, usuarioId });

    if (!voteDoc) {
      throw new Error('Documento "Vote" não encontrado');
    }

    const vote = voteDoc.vote === 1 ? 'upvotes' : 'downvotes';

    const postCore = await getPostCore(postId);

    await postCore.update({ _id: postId }, { $inc: { [vote]: -1 } });

    await VotesModel.deleteOne({ _id: voteDoc._id });
  },
};

async function getPostCore(postId) {
  let postCore;

  if (await perguntaCore.find({ _id: postId })) {
    postCore = perguntaCore;
  } else if (await respostaCore.find({ _id: postId })) {
    postCore = respostaCore;
  } else {
    throw new Error('Referência para post inválida');
  }

  return postCore;
}

async function validate({ postId, usuarioId }) {
  const usuario = await usuarioCore.find({ _id: usuarioId });

  if (!usuario) {
    throw new Error('Referência para usuário inválida');
  }

  const haveUsuarioVoted = await VotesModel.findOne({ postId, usuarioId });

  if (haveUsuarioVoted) {
    throw new Error('Usuário não pode votar novamente no mesmo post');
  }
}
