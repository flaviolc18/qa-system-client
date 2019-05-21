import { actionsFactory, reducerFactory, gettersFactory } from './creators/factory';

const context = 'perguntas';

let loadPerguntaURL = filters => '/api/perguntas/' + filters.id;
let loadPerguntasUsuarioURL = filters => '/api/perguntas/usuarios/' + filters.usuarioId;
let loadPerguntasURL = () => '/api/perguntas';
let postPerguntaURL = () => '/api/perguntas';
let editPerguntaURL = filters => '/api/perguntas/' + filters.id;
let deletePerguntaURL = filters => '/api/perguntas/' + filters.id;
let upvotePerguntaURL = filters => '/api/perguntas/upvote/' + filters.id;
let downvotePerguntaURL = filters => '/api/perguntas/downvote/' + filters.id;

let actions = actionsFactory({
  context,
  buildURLs: {
    loadOneURLs: [loadPerguntaURL, loadPerguntasUsuarioURL, loadPerguntasURL, upvotePerguntaURL, downvotePerguntaURL],
    createOneURLs: [postPerguntaURL],
    editOneURLs: [editPerguntaURL],
    removeOneURLs: [deletePerguntaURL],
  },
});

let getters = gettersFactory({ context });
export const editPergunta = actions.edit[0];
export const loadPerguntasUsuario = actions.load[1];
export const loadPerguntas = actions.load[2];
export const upvotePergunta = actions.load[3];
export const downvotePergunta = actions.load[4];

export const removePergunta = actions.remove[0];
export const loadPergunta = actions.load[0];
export const postPergunta = actions.create[0];
export const getPergunta = getters.getOneById;
export const getPerguntaByFilters = getters.getByFilters;
export const getPerguntaLoadingState = getters.getLoadingState;

export const perguntas = reducerFactory({ context });
