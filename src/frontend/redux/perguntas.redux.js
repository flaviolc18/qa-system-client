import createReducer from './creators/create-reducer';
import { combineReducers } from 'redux';
import { assignAllIds, assignById, assignTotalSizeByFilter, assignByFilter } from './helpers/state-transformation';
import { http } from '../helpers/http';
import { serialize } from '../helpers/serializer';

const PERGUNTAS_REQUEST = 'PERGUNTAS_REQUEST';
const PERGUNTAS_RECEIVE = 'PERGUNTAS_RECEIVE';
const PERGUNTAS_NOT_RECEIVE = 'PERGUNTAS_NOT_RECEIVE';

const PERGUNTAS_POST_REQUEST = 'PERGUNTAS_POST_REQUEST';
const PERGUNTAS_POST_FAILURE = 'PERGUNTAS_POST_FAILURE';

export function loadPergunta(filters) {
  return {
    types: [PERGUNTAS_REQUEST, PERGUNTAS_RECEIVE, PERGUNTAS_NOT_RECEIVE],
    callAPI: () => http.get('/api/perguntas/' + filters.id),
    payload: {
      filters,
    },
  };
}

export function loadPerguntasUsuario(filters) {
  return {
    types: [PERGUNTAS_REQUEST, PERGUNTAS_RECEIVE, PERGUNTAS_NOT_RECEIVE],
    callAPI: () => http.get('/api/perguntas/usuario/' + filters.usuarioId),
    payload: {
      filters,
    },
  };
}

export function loadPerguntas(filters) {
  return {
    types: [PERGUNTAS_REQUEST, PERGUNTAS_RECEIVE, PERGUNTAS_NOT_RECEIVE],
    callAPI: () => http.get('/api/perguntas'),
    payload: { filters },
  };
}

export function postPergunta(questionBody) {
  return {
    types: [PERGUNTAS_POST_REQUEST, PERGUNTAS_RECEIVE, PERGUNTAS_POST_FAILURE],
    callAPI: () => http.post('/api/perguntas', questionBody),
    payload: {
      questionBody,
    },
  };
}

export function getPergunta(state, id) {
  return state.perguntas.byIds[id];
}

export function getPerguntaByFilters(state, filters) {
  const ids = state.perguntas ? state.perguntas.byFilters[serialize(filters)] : [];
  if (ids) {
    const perguntas = ids.map(id => getPergunta(state, id));
    return perguntas;
  }
  return [];
}

export const perguntas = combineReducers({
  totalByFilters: createReducer(
    {},
    {
      [PERGUNTAS_RECEIVE]: (state, action) => {
        return assignTotalSizeByFilter(state, action);
      },
    }
  ),
  byIds: createReducer(
    {},
    {
      [PERGUNTAS_RECEIVE]: (state, action) => {
        return assignById(state, action.response.elements);
      },
    }
  ),
  allIds: createReducer([], {
    [PERGUNTAS_RECEIVE]: (state, action) => {
      return assignAllIds(state, action.response.elements);
    },
  }),
  byFilters: createReducer(
    {},
    {
      [PERGUNTAS_RECEIVE]: (state, action) => {
        return assignByFilter(state, action);
      },
    }
  ),
});
