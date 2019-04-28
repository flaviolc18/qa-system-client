import createReducer from './creators/create-reducer';
import { combineReducers } from 'redux';
import { http } from '../helpers/http';

const SESSION_REQUEST = 'SESSION_REQUEST';
const SESSION_RECEIVE = 'SESSION_RECEIVE';
const SESSION_NOT_RECEIVE = 'SESSION_NOT_RECEIVE';

export function loadSession() {
  return {
    types: [SESSION_REQUEST, SESSION_RECEIVE, SESSION_NOT_RECEIVE],
    callAPI: () => http.get('/api/sessions').then(session => http.get('/api/sessions/' + session._id)),
    payload: {},
  };
}

export function getSession(state) {
  return state.app.session;
}

export const app = combineReducers({
  session: createReducer(
    {},
    {
      [SESSION_RECEIVE]: (state, action) => {
        return action.response;
      },
    }
  ),
});
