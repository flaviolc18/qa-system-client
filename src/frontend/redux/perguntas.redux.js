import { actionsFactory, reducerFactory, gettersFactory } from './creators/factory';
const context = 'perguntas';

let searchPerguntaURL = filters => '/api/perguntas/search/' + filters.search;
let loadPerguntaURL = filters => '/api/perguntas/' + filters.id;
let loadPerguntasUsuarioURL = filters => '/api/perguntas/usuarios/' + filters.usuarioId;
let loadPerguntasURL = () => '/api/perguntas';
let postPerguntaURL = () => '/api/perguntas';
let editPerguntaURL = filters => '/api/perguntas/' + filters.id;
let deletePerguntaURL = filters => '/api/perguntas/' + filters.id;

let actions = actionsFactory({
  context,
  buildURLs: {
<<<<<<< HEAD
    loadOneURLs: [
      loadPerguntaURL,
      loadPerguntasUsuarioURL,
      loadPerguntasURL,
      upvotePerguntaURL,
      downvotePerguntaURL,
      searchPerguntaURL,
    ],
=======
    loadOneURLs: [loadPerguntaURL, loadPerguntasUsuarioURL, loadPerguntasURL],
>>>>>>> d9f96811ff7547a3dac090e12b1859d7ec5da698
    createOneURLs: [postPerguntaURL],
    editOneURLs: [editPerguntaURL],
    removeOneURLs: [deletePerguntaURL],
  },
});

let getters = gettersFactory({ context });
<<<<<<< HEAD
export const editPergunta = actions.edit[0];
export const loadPerguntasUsuario = actions.load[1];
export const loadPerguntas = actions.load[2];
export const upvotePergunta = actions.load[3];
export const downvotePergunta = actions.load[4];
export const searchPergunta = actions.load[5];

export const removePergunta = actions.remove[0];
=======
>>>>>>> d9f96811ff7547a3dac090e12b1859d7ec5da698

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
