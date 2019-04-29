import createReducer from './creators/create-reducer';
import { combineReducers } from 'redux';
import { assignAllIds, assignById, assignByFilter, assignTotalSizeByFilter } from './helpers/state-transformation';
import { http } from '../helpers/http';
import { serialize } from '../helpers/serializer';

const RESPOSTAS_REQUEST = 'RESPOSTAS_REQUEST';
const RESPOSTAS_RECEIVE = 'RESPOSTAS_RECEIVE';

const RESPOSTAS_NOT_RECEIVE = 'RESPOSTAS_NOT_RECEIVE';

const RESPOSTAS_POST_REQUEST = 'RESPOSTAS_POST_REQUEST';
const RESPOSTAS_POST_FAILURE = 'RESPOSTAS_POST_FAILURE';

export function loadRespostasByPergunta(filters) {
  return {
    types: [RESPOSTAS_REQUEST, RESPOSTAS_RECEIVE, RESPOSTAS_NOT_RECEIVE],
    callAPI: () => http.get('/api/perguntas/' + filters.perguntaId + '/respostas'),
    payload: {
      filters,
    },
  };
}

export function postResposta(respostaBody) {
  const filters = { perguntaId: respostaBody.perguntaId };

  return {
    types: [RESPOSTAS_POST_REQUEST, RESPOSTAS_RECEIVE, RESPOSTAS_POST_FAILURE],
    callAPI: () => http.post('/api/respostas', respostaBody),
    payload: {
      filters,
    },
  };
}

export function loadRespostasByUsuario(filters) {
  return {
    types: [RESPOSTAS_REQUEST, RESPOSTAS_RECEIVE, RESPOSTAS_NOT_RECEIVE],
    callAPI: () => http.get('/api/respostas/usuario/' + filters.usuarioId),
    payload: {
      filters,
    },
  };
}

export function getRespostaById(state, id) {
  return state.respostas.byIds[id];
}

export function getRespostaByPergunta(state, filters) {
  const ids = state.respostas ? state.respostas.byFilters[serialize(filters)] : [];
  if (ids) {
    const respostas = ids.map(id => getRespostaById(state, id));
    return respostas;
  }
  return [];
}

export const respostas = combineReducers({
  totalByFilters: createReducer(
    {},
    {
      [RESPOSTAS_RECEIVE]: (state, action) => {
        return assignTotalSizeByFilter(state, action);
      },
    }
  ),
  byIds: createReducer(
    {},
    {
      [RESPOSTAS_RECEIVE]: (state, action) => {
        return assignById(state, action.response.elements);
      },
    }
  ),
  allIds: createReducer([], {
    [RESPOSTAS_RECEIVE]: (state, action) => {
      return assignAllIds(state, action.response.elements);
    },
  }),
  byFilters: createReducer(
    {},
    {
      [RESPOSTAS_RECEIVE]: (state, action) => {
        return assignByFilter(state, action);
      },
    }
  ),
});
