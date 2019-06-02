'use strict';

const updatePergunta = require('../pergunta/update-pergunta');
const findPergunta = require('../pergunta/find-pergunta');
const updateResposta = require('../resposta/update-resposta');
const findResposta = require('../resposta/find-resposta');
const findUsuario = require('../usuario/find-usuario');

const VotesModel = require('./votes.model');
const deleteManyVotes = require('./delete-many-votes');
const findVote = require('./find-vote');

const UPVOTE = 1;
const DOWNVOTE = -1;

exports.upvote = async ({ usuarioId, postId }) => {
  const prevVote = await getPreviousVote({ usuarioId, postId, vote: UPVOTE });

  if (!prevVote) {
    return createNewVote({ usuarioId, postId, vote: UPVOTE });
  }

  return updateExistingVote({ usuarioId, postId, vote: UPVOTE });
};

exports.downvote = async ({ usuarioId, postId }) => {
  const prevVote = await getPreviousVote({ usuarioId, postId, vote: DOWNVOTE });

  if (!prevVote) {
    return createNewVote({ usuarioId, postId, vote: DOWNVOTE });
  }

  return updateExistingVote({ usuarioId, postId, vote: DOWNVOTE });
};

exports.unvote = async ({ postId, usuarioId }) => {
  const voteDoc = await VotesModel.findOne({ postId, usuarioId });

  if (!voteDoc) {
    throw new Error('Documento "Vote" não encontrado');
  }

  const voteType = voteDoc.vote === UPVOTE ? 'upvotes' : 'downvotes';

  const updatePost = await getUpdatePost(postId);

  const deletedVote = await VotesModel.findOneAndRemove({ _id: voteDoc._id });

  await updatePost({ _id: postId }, { $inc: { [voteType]: -1 } });

  return deletedVote;
};

exports.find = findVote;
exports.deleteMany = deleteManyVotes;

async function getUpdatePost(postId) {
  let updatePost;

  if (await findPergunta({ _id: postId })) {
    updatePost = updatePergunta;
  } else if (await findResposta({ _id: postId })) {
    updatePost = updateResposta;
  } else {
    throw new Error('Referência para post inválida');
  }

  return updatePost;
}

async function getPreviousVote({ postId, usuarioId, vote }) {
  const usuario = await findUsuario({ _id: usuarioId });

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

  const updatePost = await getUpdatePost(postId);

  await updatePost({ _id: postId }, { $inc: { [voteType]: 1 } });

  return voteDoc;
}

async function updateExistingVote({ usuarioId, postId, vote }) {
  const [voteType, otherVoteType] = vote === UPVOTE ? ['upvotes', 'downvotes'] : ['downvotes', 'upvotes'];

  const voteDoc = await VotesModel.findOneAndUpdate({ usuarioId, postId }, { vote }, { new: true });

  const updatePost = await getUpdatePost(postId);

  await updatePost({ _id: postId }, { $inc: { [voteType]: 1, [otherVoteType]: -1 } });

  return voteDoc;
}
