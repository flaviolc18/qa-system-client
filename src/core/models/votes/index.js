'use strict';

const perguntaCore = require('../pergunta');
const respostaCore = require('../resposta');
const usuarioCore = require('../usuario');

const VotesModel = require('./votes.model');

const UPVOTE = 1;
const DOWNVOTE = -1;

module.exports = {
  upvote: async ({ usuarioId, postId }) => {
    const prevVote = await getPreviousVote({ usuarioId, postId, vote: UPVOTE });

    if (!prevVote) {
      return createNewVote({ usuarioId, postId, vote: UPVOTE });
    }

    return updateExistingVote({ usuarioId, postId, vote: UPVOTE });
  },
  downvote: async ({ usuarioId, postId }) => {
    const prevVote = await getPreviousVote({ usuarioId, postId, vote: DOWNVOTE });

    if (!prevVote) {
      return createNewVote({ usuarioId, postId, vote: DOWNVOTE });
    }

    return updateExistingVote({ usuarioId, postId, vote: DOWNVOTE });
  },

  unvote: async ({ postId, usuarioId }) => {
    const voteDoc = await VotesModel.findOne({ postId, usuarioId });

    if (!voteDoc) {
      throw new Error('Documento "Vote" não encontrado');
    }

    const voteType = voteDoc.vote === UPVOTE ? 'upvotes' : 'downvotes';

    const postCore = await getPostCore(postId);

    const deletedVote = await VotesModel.findOneAndRemove({ _id: voteDoc._id });

    await postCore.update({ _id: postId }, { $inc: { [voteType]: -1 } });

    return deletedVote;
  },

  find: query => {
    return VotesModel.findOne(query);
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

async function getPreviousVote({ postId, usuarioId, vote }) {
  const usuario = await usuarioCore.find({ _id: usuarioId });

  if (!usuario) {
    throw new Error('Referência para usuário inválida');
  }

  const voteFound = await VotesModel.findOne({ postId, usuarioId });

  if (!voteFound) {
    return;
  }

  const haveUsuarioVoted = voteFound.vote === vote;

  if (haveUsuarioVoted) {
    throw new Error('Usuário não pode votar novamente no mesmo post');
  }

  return voteFound;
}

async function createNewVote({ usuarioId, postId, vote }) {
  const voteType = vote === UPVOTE ? 'upvotes' : 'downvotes';

  const voteModel = new VotesModel({ vote, date: new Date(), usuarioId, postId });

  const voteDoc = await voteModel.save();

  const postCore = await getPostCore(postId);

  await postCore.update({ _id: postId }, { $inc: { [voteType]: 1 } });

  return voteDoc;
}

async function updateExistingVote({ usuarioId, postId, vote }) {
  const [voteType, otherVoteType] = vote === UPVOTE ? ['upvotes', 'downvotes'] : ['downvotes', 'upvotes'];

  const voteDoc = await VotesModel.findOneAndUpdate({ usuarioId, postId }, { vote }, { new: true });

  const postCore = await getPostCore(postId);

  await postCore.update({ _id: postId }, { $inc: { [voteType]: 1, [otherVoteType]: -1 } });

  return voteDoc;
}
