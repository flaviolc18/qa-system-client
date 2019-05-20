import { actionsFactory, reducerFactory, gettersFactory } from './creators/factory';

const context = 'usuarios';

let loadUsuarioURL = filters => '/api/usuarios/' + filters.id;
let updateUsuarioURL = filters => '/api/usuarios/' + filters.id;
let loadUsuariosByPerguntaRespostasURL = filters => '/api/usuarios/perguntas/' + filters.perguntaId + '/respostas';
let loadUsuarioPerguntaURL = filters => '/api/usuarios/perguntas/' + filters.perguntaId;

let actions = actionsFactory({
  context,
  buildURLs: {
    loadOneURLs: [loadUsuarioURL, loadUsuariosByPerguntaRespostasURL, loadUsuarioPerguntaURL],
    editOneURLs: [updateUsuarioURL],
  },
});

let getters = gettersFactory({ context });

export const getUsuario = getters.getOneById;
export const getUsuariosByFilter = getters.getByFilters;

export const loadUsuario = actions.load[0];
export const loadUsuariosByPerguntaRespostas = actions.load[1];
export const loadUsuarioPergunta = actions.load[2];
export const updateUsuario = actions.edit[0];
export const getUsuarioLoadingState = getters.getLoadingState;

export const usuarios = reducerFactory({ context });
