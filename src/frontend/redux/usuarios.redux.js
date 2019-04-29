import createReducer from './creators/create-reducer';
import { combineReducers } from 'redux';
import { assignAllIds, assignById, assignTotalSizeByFilter, assignByFilter } from './helpers/state-transformation';
import { http } from '../helpers/http';
import { serialize } from '../helpers/serializer';
const USUARIOS_REQUEST = 'USUARIOS_REQUEST';
const USUARIOS_RECEIVE = 'USUARIOS_RECEIVE';

const USUARIOS_NOT_RECEIVE = 'USUARIOS_NOT_RECEIVE';

export function loadUsuario(filters) {
  return {
    types: [USUARIOS_REQUEST, USUARIOS_RECEIVE, USUARIOS_NOT_RECEIVE],
    callAPI: () => http.get('/api/usuarios/' + filters.id),
    payload: {
      filters,
    },
  };
}

export function loadUsuariosByPerguntaRespostas(filters) {
  return {
    types: [USUARIOS_REQUEST, USUARIOS_RECEIVE, USUARIOS_NOT_RECEIVE],
    callAPI: () => http.get('/api/perguntas/' + filters.perguntaId + '/respostas/usuarios'),
    payload: {
      filters,
    },
  };
}

export function loadUsuarioPergunta(filters) {
  return {
    types: [USUARIOS_REQUEST, USUARIOS_RECEIVE, USUARIOS_NOT_RECEIVE],
    callAPI: () => http.get(`/api/perguntas/${filters.perguntaId}/usuario`),
    payload: {
      filters,
    },
  };
}

export function getUsuario(state, id) {
  return state.usuarios.byIds[id];
}

export function getUsuariosByFilter(state, filters) {
  const ids = state.usuarios.byFilters[serialize(filters)];
  if (ids) {
    const usuarios = ids.map(id => getUsuario(state, id));
    return usuarios;
  }

  return [];
}

export const usuarios = combineReducers({
  totalByFilters: createReducer(
    {},
    {
      [USUARIOS_RECEIVE]: (state, action) => {
        return assignTotalSizeByFilter(state, action);
      },
    }
  ),
  byIds: createReducer(
    {},
    {
      [USUARIOS_RECEIVE]: (state, action) => {
        return assignById(state, action.response.elements);
      },
    }
  ),
  allIds: createReducer([], {
    [USUARIOS_RECEIVE]: (state, action) => {
      return assignAllIds(state, action.response.elements);
    },
  }),
  byFilters: createReducer(
    {},
    {
      [USUARIOS_RECEIVE]: (state, action) => {
        return assignByFilter(state, action);
      },
    }
  ),
});
