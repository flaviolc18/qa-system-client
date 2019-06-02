'use strict';

const { test } = require('tap');

const { withDB, randomObjectId } = require('../../test-helpers');
const seed = require('../../../seed');

const voteModel = require('../../../src/core/models/votes');
const findPergunta = require('../../../src/core/models/pergunta/find-pergunta');
const findResposta = require('../../../src/core/models/resposta/find-resposta');

test(
  'model.vote.upvotes: registra voto para pergunta',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();
    const pergunta = await seed.entidades.pergunta({ usuarioId });

    t.same(pergunta.upvotes, 0);
    t.same(pergunta.downvotes, 0);

    await t.resolves(voteModel.upvote({ postId: pergunta._id, usuarioId }));

    const perguntaAtualizada = await findPergunta({ _id: pergunta._id });

    t.same(perguntaAtualizada.upvotes, 1);
    t.same(perguntaAtualizada.downvotes, 0);

    t.end();
  })
);

test(
  'model.vote.downvote: registra voto para resposta',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();
    const resposta = await seed.entidades.resposta({ usuarioId });

    t.same(resposta.upvotes, 0);
    t.same(resposta.downvotes, 0);

    await t.resolves(voteModel.downvote({ postId: resposta._id, usuarioId }));

    const respostaAtualizada = await findResposta({ _id: resposta._id });

    t.same(respostaAtualizada.upvotes, 0);
    t.same(respostaAtualizada.downvotes, 1);

    t.end();
  })
);

test(
  'model.vote.downvote/upvote: altera o vote de downvote para upvote',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();
    const resposta = await seed.entidades.resposta({ usuarioId });

    t.same(resposta.upvotes, 0);
    t.same(resposta.downvotes, 0);

    await t.resolves(voteModel.downvote({ postId: resposta._id, usuarioId }));

    const respostaAtualizada = await findResposta({ _id: resposta._id });

    t.same(respostaAtualizada.upvotes, 0);
    t.same(respostaAtualizada.downvotes, 1);

    await t.resolves(voteModel.upvote({ postId: resposta._id, usuarioId }));

    const respostaAtualizada2 = await findResposta({ _id: resposta._id });

    t.same(respostaAtualizada2.upvotes, 1);
    t.same(respostaAtualizada2.downvotes, 0);

    t.end();
  })
);

test(
  'model.vote.upvote/downvote: altera o vote de upvote para downvote',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();
    const resposta = await seed.entidades.resposta({ usuarioId });

    t.same(resposta.upvotes, 0);
    t.same(resposta.downvotes, 0);

    await t.resolves(voteModel.upvote({ postId: resposta._id, usuarioId }));

    const respostaAtualizada = await findResposta({ _id: resposta._id });

    t.same(respostaAtualizada.upvotes, 1);
    t.same(respostaAtualizada.downvotes, 0);

    await t.resolves(voteModel.downvote({ postId: resposta._id, usuarioId }));

    const respostaAtualizada2 = await findResposta({ _id: resposta._id });

    t.same(respostaAtualizada2.upvotes, 0);
    t.same(respostaAtualizada2.downvotes, 1);

    t.end();
  })
);

test(
  'model.vote.upvotes: referencia para post inválida',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();

    await t.rejects(
      voteModel.upvote({ postId: randomObjectId(), usuarioId }),
      new Error('Referência para post inválida')
    );

    t.end();
  })
);

test(
  'model.vote.upvotes: referencia para usuário inválida',
  withDB(async t => {
    const { _id: perguntaId } = await seed.entidades.resposta();

    await t.rejects(
      voteModel.upvote({ postId: perguntaId, usuarioId: randomObjectId() }),
      new Error('Referência para usuário inválida')
    );

    t.end();
  })
);

test(
  'model.vote.upvotes: usuario tenta votar 2 vezes no mesmo post',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();
    const { _id: perguntaId } = await seed.entidades.pergunta({ usuarioId });

    await t.resolves(voteModel.upvote({ postId: perguntaId, usuarioId }));

    await t.rejects(
      voteModel.upvote({ postId: perguntaId, usuarioId }),
      new Error('Usuário não pode votar novamente no mesmo post')
    );

    t.end();
  })
);

test(
  'model.vote.unvote: remove voto para pergunta',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();
    const { _id: perguntaId } = await seed.entidades.pergunta({ usuarioId });

    await t.resolves(voteModel.upvote({ postId: perguntaId, usuarioId }));

    await t.resolves(voteModel.unvote({ postId: perguntaId, usuarioId }));
    const perguntaAtualizada = await findPergunta({ _id: perguntaId });

    t.same(perguntaAtualizada.upvotes, 0);

    t.end();
  })
);

test(
  'model.vote.unvote: remove voto para resposta',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();
    const { _id: respostaId } = await seed.entidades.resposta({ usuarioId });

    await t.resolves(voteModel.downvote({ postId: respostaId, usuarioId }));
    let respostaAtualizada = await findResposta({ _id: respostaId });

    await t.resolves(voteModel.unvote({ postId: respostaId, usuarioId }));

    respostaAtualizada = await findResposta({ _id: respostaId });

    t.same(respostaAtualizada.downvotes, 0);

    t.end();
  })
);

test(
  'model.vote.unvote: tenta remover sem voto pré-cadastrado',
  withDB(async t => {
    await t.rejects(
      voteModel.unvote({ postId: randomObjectId(), usuarioId: randomObjectId() }),
      new Error('Documento "Vote" não encontrado')
    );

    t.end();
  })
);

test(
  'model.vote.find: recupera um vote cadastrado',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();
    const pergunta = await seed.entidades.pergunta({ usuarioId });

    const {
      _doc: { __v, ...vote },
    } = await voteModel.upvote({ postId: pergunta._id, usuarioId });

    const {
      _doc: { __v: __v2, ...foundVote },
    } = await voteModel.find({ postId: pergunta._id, usuarioId });

    t.strictSame(foundVote, vote);

    t.end();
  })
);
