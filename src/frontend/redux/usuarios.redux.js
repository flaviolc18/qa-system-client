import { actionsFactory, reducerFactory, gettersFactory } from './creators/factory';

const context = 'usuarios';

let loadUsuarioURL = filters => '/api/usuarios/' + filters.id;
let updateUsuarioURL = filters => '/api/usuarios/' + filters.id;
let loadUsuariosRespostaURL = filters => '/api/usuarios/respostas/' + filters.respostaId;
let loadUsuarioPerguntaURL = filters => '/api/usuarios/perguntas/' + filters.perguntaId;
let changePasswordURL = filters => '/api/usuarios/change-password/' + filters.id;
let changeProfilePictureURL = filters => `/api/usuarios/${filters.id}/upload`;

let actions = actionsFactory({
  context,
  buildURLs: {
    loadOneURLs: [loadUsuarioURL, loadUsuariosRespostaURL, loadUsuarioPerguntaURL],
    editOneURLs: [updateUsuarioURL, changePasswordURL],
    uploadOneURLs: [changeProfilePictureURL],
  },
});

let getters = gettersFactory({ context });

export const getUsuario = getters.getOneById;
export const getUsuariosByFilter = getters.getByFilters;

export const loadUsuario = actions.load[0];
export const loadUsuariosByResposta = actions.load[1];
export const loadUsuarioPergunta = actions.load[2];

export const updateUsuario = actions.edit[0];
export const changePasswordUsuario = actions.edit[1];

export const changeProfilePicture = actions.upload[0];

export const getUsuarioLoadingState = getters.getLoadingState;

export const usuarios = reducerFactory({ context });
