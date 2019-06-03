'use strict';

const UsuarioModel = require('./usuario.model');
const findImagem = require('../imagem/find-imagem');

const { nomeInitialImage } = require('../../../utils');

module.exports = async function(usuarioData) {
  const initialImagem = (await findImagem({ nome: nomeInitialImage })) || {};

  const usuario = new UsuarioModel({ ...usuarioData, imagemId: initialImagem._id });

  return usuario.save();
};
