import { actionsFactory, reducerFactory, gettersFactory } from './creators/factory';

const context = 'respostas';

let loadRespostasByPerguntaURL = filters => '/api/respostas/perguntas/' + filters.perguntaId;
let loadRespostasByUsuarioURL = filters => '/api/respostas/usuarios/' + filters.usuarioId;
let postRespostaURL = () => '/api/respostas';
let editRespostaURL = filters => '/respostas/' + filters.perguntaId;
let deleteRespostaURL = filters => '/respostas/' + filters.perguntaId;
let actions = actionsFactory({
  context,
  buildURLs: {
    loadOneURLs: [loadRespostasByPerguntaURL, loadRespostasByUsuarioURL],
    createOneURLs: [postRespostaURL],
    editOneURLs: [editRespostaURL],
    removeOneURLs: [deleteRespostaURL],
  },
});

let getters = gettersFactory({ context });

export const getRespostaById = getters.getOneById;
export const getRespostaByPergunta = getters.getByFilters;
export const getRespostaLoadingState = getters.getLoadingState;

export const loadRespostasByPergunta = actions.load[0];
export const loadRespostasByUsuario = actions.load[1];
export const editResposta = actions.edit[0];
export const removeResposta = actions.remove[0];

export const respostas = reducerFactory({ context });

export const postResposta = actions.create[0];
