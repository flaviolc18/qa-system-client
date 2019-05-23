import { http } from '../../helpers/http';
import { combineReducers } from 'redux';
import createReducer from '../creators/create-reducer';
import {
  assignAllIds,
  assignById,
  assignTotalSizeByFilter,
  assignByFilter,
  assignLoadingState,
  deleteById,
  deleteAllIds,
} from '../helpers/state-transformation';

import { serialize } from '../../helpers/serializer';

const loadPrefix = 'LOAD';
const createPrefix = 'CREATE';
const deletePrefix = 'DELETE';
const editPrefix = 'EDIT';

function buildActionLoad({ buildURLs, context }) {
  const request = loadPrefix + '_' + context + '_' + 'REQUEST';
  const failure = loadPrefix + '_' + context + '_' + 'FAILURE';
  const success = loadPrefix + '_' + context + '_' + 'SUCCESS';

  return buildURLs.map(func => {
    return (_filters, sobrepositionFilter) => {
      const filters = sobrepositionFilter ? sobrepositionFilter : _filters;
      return {
        types: [request, success, failure],
        callAPI: () => http.get(func(_filters)),
        payload: {
          filters,
        },
      };
    };
  });
}

function buildActionCreate({ buildURLs, context }) {
  const request = createPrefix + '_' + context + '_' + 'REQUEST';
  const failure = createPrefix + '_' + context + '_' + 'FAILURE';
  const success = loadPrefix + '_' + context + '_' + 'SUCCESS';

  return buildURLs.map(func => {
    return (_filters, sobrepositionFilter) => {
      const filters = sobrepositionFilter ? sobrepositionFilter : _filters;

      return {
        types: [request, success, failure],
        callAPI: () => http.post(func(_filters), _filters),
        payload: {
          filters,
        },
      };
    };
  });
}

function buildActionDelete({ buildURLs, context }) {
  const request = deletePrefix + '_' + context + '_' + 'REQUEST';
  const failure = deletePrefix + '_' + context + '_' + 'FAILURE';
  const success = deletePrefix + '_' + context + '_' + 'SUCCESS';

  return buildURLs.map(func => {
    return (_filters, sobrepositionFilter) => {
      const filters = sobrepositionFilter ? sobrepositionFilter : _filters;

      return {
        types: [request, success, failure],
        callAPI: () => http.delete(func(_filters)),
        payload: {
          filters,
        },
      };
    };
  });
}

function buildActionEdit({ buildURLs, context }) {
  const request = editPrefix + '_' + context + '_' + 'REQUEST';
  const failure = editPrefix + '_' + context + '_' + 'FAILURE';
  const success = loadPrefix + '_' + context + '_' + 'SUCCESS';

  return buildURLs.map(func => {
    return (_filters, data, sobrepositionFilter) => {
      const filters = sobrepositionFilter ? sobrepositionFilter : _filters;

      return {
        types: [request, success, failure],
        callAPI: () => http.post(func(_filters), data),
        payload: {
          filters,
        },
      };
    };
  });
}

function getOneById(state, context, id) {
  const obj = state[context].byIds[id];
  return obj ? obj : null;
}

function getByFilters(state, context, filters) {
  const ids = state[context] ? state[context].byFilters[serialize(filters)] : [];
  if (ids) {
    let objects = ids.map(id => getOneById(state, context, id));
    objects = objects.filter(obj => obj !== null);
    return objects;
  }
  return [];
}

function getLoadingState(state, context, filters) {
  return state[context].loadingStateByFilters[serialize(filters)];
}

export function gettersFactory({ context }) {
  return {
    getOneById: (state, id) => getOneById(state, context, id),
    getByFilters: (state, filters) => getByFilters(state, context, filters),
    getLoadingState: (state, filters) => getLoadingState(state, context, filters),
  };
}

export function actionsFactory({
  context,
  buildURLs: { loadOneURLs = [], createOneURLs = [], removeOneURLs = [], editOneURLs = [] },
}) {
  let load = buildActionLoad({ buildURLs: loadOneURLs, context });
  let create = buildActionCreate({ buildURLs: createOneURLs, context });
  let remove = buildActionDelete({ buildURLs: removeOneURLs, context });
  let edit = buildActionEdit({ buildURLs: editOneURLs, context });

  return {
    load,
    create,
    remove,
    edit,
  };
}

export function reducerFactory({ context }) {
  return combineReducers({
    byIds: createReducer(
      {},
      {
        [loadPrefix + '_' + context + '_' + 'SUCCESS']: (state, action) => {
          return assignById(state, action.response.elements);
        },
        [loadPrefix + '_' + context + '_' + 'FAILURE']: state => {
          return state;
        },
        [deletePrefix + '_' + context + '_' + 'SUCCESS']: (state, action) => {
          return deleteById(state, action.response.elements);
        },
      }
    ),
    allIds: createReducer([], {
      [loadPrefix + '_' + context + '_' + 'SUCCESS']: (state, action) => {
        return assignAllIds(state, action.response.elements);
      },
      [loadPrefix + '_' + context + '_' + 'FAILURE']: state => {
        return state;
      },
      [deletePrefix + '_' + context + '_' + 'SUCCESS']: (state, action) => {
        return deleteAllIds(state, action.response.elements);
      },
    }),
    totalByFilters: createReducer(
      {},
      {
        [loadPrefix + '_' + context + '_' + 'SUCCESS']: (state, action) => {
          return assignTotalSizeByFilter(state, action);
        },
        [loadPrefix + '_' + context + '_' + 'FAILURE']: (state, action) => {
          return assignByFilter(state, { filters: action.filters, response: { total: 0 } });
        },
      }
    ),
    byFilters: createReducer(
      {},
      {
        [loadPrefix + '_' + context + '_' + 'SUCCESS']: (state, action) => {
          return assignByFilter(state, action);
        },
        [loadPrefix + '_' + context + '_' + 'FAILURE']: (state, action) => {
          return assignByFilter(state, { filters: action.filters, response: { elements: [] } });
        },
      }
    ),
    loadingStateByFilters: createReducer('', {
      [loadPrefix + '_' + context + '_' + 'SUCCESS']: (state, action) => {
        return assignLoadingState(state, action, 'LOADED');
      },
      [loadPrefix + '_' + context + '_' + 'FAILURE']: (state, action) => {
        return assignLoadingState(state, action, 'NOT_LOADED');
      },
      [loadPrefix + '_' + context + '_' + 'REQUEST']: (state, action) => {
        return assignLoadingState(state, action, 'LOADING');
      },
    }),
  });
}
