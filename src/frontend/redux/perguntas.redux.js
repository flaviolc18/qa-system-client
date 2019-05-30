import { actionsFactory, reducerFactory, gettersFactory } from './creators/factory';
const context = 'perguntas';

let loadPerguntaURL = filters => '/api/perguntas/' + filters.id;
let loadPerguntasUsuarioURL = filters => '/api/perguntas/usuarios/' + filters.usuarioId;
let loadPerguntasURL = () => '/api/perguntas';
let postPerguntaURL = () => '/api/perguntas';
let editPerguntaURL = filters => '/api/perguntas/' + filters.id;
let deletePerguntaURL = filters => '/api/perguntas/' + filters.id;

let actions = actionsFactory({
  context,
  buildURLs: {
    loadOneURLs: [loadPerguntaURL, loadPerguntasUsuarioURL, loadPerguntasURL],
    createOneURLs: [postPerguntaURL],
    editOneURLs: [editPerguntaURL],
    removeOneURLs: [deletePerguntaURL],
  },
});

let getters = gettersFactory({ context });

export const getPergunta = getters.getOneById;
export const getPerguntaByFilters = getters.getByFilters;
export const getPerguntaLoadingState = getters.getLoadingState;

export const loadPergunta = actions.load[0];
export const loadPerguntasUsuario = actions.load[1];
export const loadPerguntas = actions.load[2];

export const postPergunta = actions.create[0];
export const editPergunta = actions.edit[0];
export const removePergunta = actions.remove[0];

export const perguntas = reducerFactory({ context });
