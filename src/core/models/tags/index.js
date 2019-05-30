'use strict';

const TagModel = require('./tag.model');

exports.generate = generateTags;
exports.update = updateTags;
exports.find = findTag;

function generateTags(tagNames) {
  return Promise.all(
    tagNames.map(async tagName => {
      const tag = await incrementQuantidadeUsos(tagName);

      if (tag) {
        return tag._id;
      }

      const newTag = await new TagModel({ nome: tagName, quantidadeUsos: 1 }).save();

      return newTag._id;
    })
  );
}

async function updateTags(oldTagIds, newTagNames) {
  const keepingTagIds = [];
  const keepingTagNames = [];

  for (const oldTagId of oldTagIds) {
    const oldTag = await TagModel.findById(oldTagId);

    if (!oldTag) {
      throw new Error(`Tag não encontrada para o ID ${oldTagId}`);
    }

    if (!newTagNames.includes(oldTag.nome)) {
      await decrementQuantidadeUsos(oldTag.nome);
    } else {
      keepingTagIds.push(oldTag._id);
      keepingTagNames.push(oldTag.nome);
    }
  }

  const notCreatedTagNames = newTagNames.filter(tagName => !keepingTagNames.includes(tagName));

  const createdTagIds = await generateTags(notCreatedTagNames);

  return [...keepingTagIds, ...createdTagIds];
}

function findTag(query) {
  return TagModel.findOne(query);
}

function incrementQuantidadeUsos(tagName) {
  return TagModel.findOneAndUpdate({ nome: tagName }, { $inc: { quantidadeUsos: 1 } });
}

function decrementQuantidadeUsos(tagName) {
  return TagModel.findOneAndUpdate({ nome: tagName }, { $inc: { quantidadeUsos: -1 } });
}
