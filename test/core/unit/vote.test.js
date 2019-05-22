'use strict';

const { test } = require('tap');

const { withDB, randomObjectId } = require('../../test-helpers');
const seed = require('../../../seed');

const voteModel = require('../../../src/core/models/votes');
const perguntaModel = require('../../../src/core/models/pergunta');
const respostaModel = require('../../../src/core/models/resposta');

test(
  'model.vote.vote: registra voto para pergunta',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();
    const pergunta = await seed.entidades.pergunta({ usuarioId });

    t.same(pergunta.vote, 0);

    await t.resolves(voteModel.vote({ postId: pergunta._id, usuarioId, vote: 1 }));

    const perguntaAtualizada = await perguntaModel.find({ _id: pergunta._id });

    t.same(perguntaAtualizada.vote, 1);

    await t.end();
  })
);

test(
  'model.vote.vote: registra voto para resposta',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();
    const resposta = await seed.entidades.resposta({ usuarioId });

    t.same(resposta.vote, 0);

    await t.resolves(voteModel.vote({ postId: resposta._id, usuarioId, vote: -1 }));

    const respostaAtualizada = await respostaModel.find({ _id: resposta._id });

    t.same(respostaAtualizada.vote, -1);

    t.end();
  })
);

test(
  'model.vote.vote: referencia para post inválida',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();

    await t.rejects(
      voteModel.vote({ postId: randomObjectId(), usuarioId, vote: -1 }),
      new Error('Referência para post inválida')
    );

    t.end();
  })
);

test(
  'model.vote.vote: referencia para usuário inválida',
  withDB(async t => {
    const { _id: perguntaId } = await seed.entidades.resposta();

    await t.rejects(
      voteModel.vote({ postId: perguntaId, usuarioId: randomObjectId(), vote: -1 }),
      new Error('Referência para usuário inválida')
    );

    t.end();
  })
);

test(
  'model.vote.vote: usuario tenta votar 2 vezes no mesmo post',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();
    const { _id: perguntaId } = await seed.entidades.pergunta({ usuarioId });

    await t.resolves(voteModel.vote({ postId: perguntaId, usuarioId, vote: 1 }));

    await t.rejects(
      voteModel.vote({ postId: perguntaId, usuarioId, vote: -1 }),
      new Error('Usuário não pode votar novamente no mesmo post')
    );

    t.end();
  })
);

test(
  'model.vote.vote: passa paramtetro vote inválido',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();
    const { _id: perguntaId } = await seed.entidades.pergunta({ usuarioId });

    await t.rejects(voteModel.vote({ postId: perguntaId, usuarioId, vote: 0 }));

    t.end();
  })
);

test(
  'model.vote.unvote: remove voto para pergunta',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();
    const { _id: perguntaId } = await seed.entidades.pergunta({ usuarioId });

    await t.resolves(voteModel.vote({ postId: perguntaId, usuarioId, vote: 1 }));

    await t.resolves(voteModel.unvote({ postId: perguntaId, usuarioId }));
    const perguntaAtualizada = await perguntaModel.find({ _id: perguntaId });

    t.same(perguntaAtualizada.vote, 0);

    t.end();
  })
);

test(
  'model.vote.unvote: remove voto para resposta',
  withDB(async t => {
    const { _id: usuarioId } = await seed.entidades.usuario();
    const { _id: respostaId } = await seed.entidades.resposta({ usuarioId });

    await t.resolves(voteModel.vote({ postId: respostaId, usuarioId, vote: 1 }));

    await t.resolves(voteModel.unvote({ postId: respostaId, usuarioId }));
    const respostaAtualizada = await respostaModel.find({ _id: respostaId });

    t.same(respostaAtualizada.vote, 0);

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
