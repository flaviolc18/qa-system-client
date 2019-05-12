import createReducer from './creators/create-reducer';
import { combineReducers } from 'redux';
import { assignAllIds, assignById, assignTotalSizeByFilter, assignByFilter } from './helpers/state-transformation';
import { http } from '../helpers/http';
import { serialize } from '../helpers/serializer';

const IMAGEMS_REQUEST = 'IMAGEMS_REQUEST';
const IMAGEMS_RECEIVE = 'IMAGEMS_RECEIVE';
const IMAGEMS_NOT_RECEIVE = 'IMAGEMS_NOT_RECEIVE';

const IMAGEMS_POST_REQUEST = 'IMAGEMS_POST_REQUEST';
const IMAGEMS_POST_FAILURE = 'IMAGEMS_POST_FAILURE';

export function loadImagemNome(filters) {
  return {
    types: [IMAGEMS_REQUEST, IMAGEMS_RECEIVE, IMAGEMS_NOT_RECEIVE],
    callAPI: () => http.get('/api/imagem/nome/' + filters.nome),
    payload: {
      filters,
    },
  };
}

export function uploadImagem(body) {
  return {
    types: [IMAGEMS_POST_REQUEST, IMAGEMS_RECEIVE, IMAGEMS_POST_FAILURE],
    callAPI: () => http.post('/api/imagem', body),
    payload: {
      filters: { nome: body.nome },
    },
  };
}

export function getImagem(state, id) {
  return state.imagens.byIds[id];
}

export function getImagensByFilters(state, filters) {
  const ids = state.imagens ? state.imagens.byFilters[serialize(filters)] : [];
  if (ids) {
    const imagens = ids.map(id => getImagem(state, id));
    return imagens;
  }
  return [];
}

export const imagens = combineReducers({
  totalByFilters: createReducer(
    {},
    {
      [IMAGEMS_RECEIVE]: (state, action) => {
        return assignTotalSizeByFilter(state, action);
      },
    }
  ),
  byIds: createReducer(
    {},
    {
      [IMAGEMS_RECEIVE]: (state, action) => {
        return assignById(state, action.response.elements);
      },
    }
  ),
  allIds: createReducer([], {
    [IMAGEMS_RECEIVE]: (state, action) => {
      return assignAllIds(state, action.response.elements);
    },
  }),
  byFilters: createReducer(
    {},
    {
      [IMAGEMS_RECEIVE]: (state, action) => {
        return assignByFilter(state, action);
      },
    }
  ),
});
