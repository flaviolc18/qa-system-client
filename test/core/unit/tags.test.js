'use strict';

const { test } = require('tap');

const { withDB, randomObjectId } = require('../../test-helpers');

const tagModel = require('../../../src/core/models/tags');
const TagModel = require('../../../src/core/models/tags/tag.model');

test(
  'model.tag.generate',
  withDB(async t => {
    const tagNames = ['teste1', 'teste2', 'teste3'];
    const tagIds = await tagModel.generate(tagNames);

    t.same(tagIds.length, 3);

    const foundTags = await Promise.all(tagIds.map(async tagId => TagModel.findById(tagId)));

    foundTags.forEach(({ nome, quantidadeUsos }, index) => {
      t.same(nome, tagNames[index]);
      t.same(quantidadeUsos, 1);
    });

    t.end();
  })
);

test(
  'model.tag.generate: passa uma tag já existente',
  withDB(async t => {
    await tagModel.generate(['teste1']);

    const tagNames = ['teste1', 'teste2', 'teste3'];
    const tagIds = await tagModel.generate(tagNames);

    const foundTags = await Promise.all(tagIds.map(async tagId => TagModel.findById(tagId)));

    foundTags.forEach(({ nome, quantidadeUsos }, index) => {
      t.same(nome, tagNames[index]);
      if (nome === 'teste1') {
        t.same(quantidadeUsos, 2);
      } else {
        t.same(quantidadeUsos, 1);
      }
    });

    t.end();
  })
);

test(
  'model.tag.update',
  withDB(async t => {
    const oldTagNames = ['teste1', 'teste2', 'teste3'];
    const oldTagIds = await tagModel.generate(oldTagNames);

    const newTagNames = ['teste4', 'teste5', 'teste2'];
    const newTagIds = await tagModel.update(oldTagIds, newTagNames);

    (await Promise.all(oldTagIds.map(async tagId => TagModel.findById(tagId)))).forEach(({ nome, quantidadeUsos }) => {
      const isOldTagThatContinuesOnNewOnes = nome === 'teste2';

      if (isOldTagThatContinuesOnNewOnes) {
        t.same(quantidadeUsos, 1);
      } else {
        t.same(quantidadeUsos, 0);
      }
    });

    (await Promise.all(newTagIds.map(async tagId => TagModel.findById(tagId)))).forEach(({ nome, quantidadeUsos }) => {
      t.ok(newTagNames.includes(nome));
      t.same(quantidadeUsos, 1);
    });

    t.end();
  })
);

test(
  'model.tag.update: passa ID de uma tag inexistente',
  withDB(async t => {
    const oldTagNames = ['teste1', 'teste2', 'teste3'];
    const oldTagIds = await tagModel.generate(oldTagNames);

    const randomId = randomObjectId();

    oldTagIds[1] = randomId;

    const newTagNames = ['teste4', 'teste2', 'teste5'];

    await t.rejects(tagModel.update(oldTagIds, newTagNames), new Error(`Tag não encontrada para o ID ${randomId}`));

    t.end();
  })
);
