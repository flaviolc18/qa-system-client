import { serialize } from '../../helpers/serializer';

export function assignById(state, objs) {
  if (!objs) return state;
  return objs.reduce(
    (newState, obj) => ({
      ...newState,
      [obj._id]: obj,
    }),
    { ...state }
  );
}
export function deleteById(state, objs) {
  const newState = state;
  objs.map(o => {
    delete state[o._id];
  });
  return newState;
}

export function assignAllIds(state, objs) {
  if (!objs) return state;

  return [...new Set(state.concat(objs.map(obj => obj._id)))];
}

export function deleteAllIds(state, objs) {
  if (!objs) return state;
  if (!state) return state;
  const ids = objs.map(obj => {
    return obj._id;
  });
  const newState = state.filter(obj => ids.indexOf(obj) < 0);

  return newState;
}

export function assignByFilter(state, { response, filters }) {
  if (!response.elements) return state;
  const key = serialize(filters);
  const ids = response.elements.map(element => element._id);
  if (!ids) {
    return Object.assign({}, state, { [key]: [] });
  }

  if (state[key]) {
    let novoValor = [...new Set(state[key].concat(ids))];
    return Object.assign({}, state, { [key]: novoValor });
  }

  return Object.assign({}, state, {
    [key]: response.total > 0 ? response.elements.map(element => element._id) : [],
  });
}

export function assignTotalSizeByFilter(state, action) {
  if (!action.response.total) return state;
  const key = serialize(action.filters);
  if (state[key]) {
    return Object.assign({}, state, { [key]: state[key] + action.response.total });
  }

  return Object.assign({}, state, { [serialize(action.filters)]: action.response.total });
}

export function assignLoadingState(state, action, loadingState) {
  return Object.assign({}, state, { [serialize(action.filters)]: loadingState });
}
