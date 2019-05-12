import createReducer from './creators/create-reducer';
import { combineReducers } from 'redux';
import { http } from '../helpers/http';

const SESSION_REQUEST = 'SESSION_REQUEST';
const SESSION_RECEIVE = 'SESSION_RECEIVE';
const SESSION_NOT_RECEIVE = 'SESSION_NOT_RECEIVE';

const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
const LOGOUT_RECEIVE = 'LOGOUT_RECEIVE';
const LOGOUT_NOT_RECEIVE = 'LOGOUT_NOT_RECEIVE';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_RECEIVE = 'LOGIN_RECEIVE';
const LOGIN_NOT_RECEIVE = 'LOGIN_NOT_RECEIVE';

export function loadSession() {
  return {
    types: [SESSION_REQUEST, SESSION_RECEIVE, SESSION_NOT_RECEIVE],
    callAPI: () => http.get('/api/sessions').then(response => response.elements[0]),
    payload: {},
  };
}

export function logout() {
  return {
    types: [LOGOUT_REQUEST, LOGOUT_RECEIVE, LOGOUT_NOT_RECEIVE],
    callAPI: () => http.delete('/api/usuarios/logout'),
    payload: {},
  };
}

export function login(body) {
  return {
    types: [LOGIN_REQUEST, LOGIN_RECEIVE, LOGIN_NOT_RECEIVE],
    callAPI: () => http.post('/api/usuarios/login', body),
    payload: {},
  };
}

export function getSession(state) {
  return state.app.session;
}

export const app = combineReducers({
  session: createReducer(null, {
    [SESSION_RECEIVE]: (state, action) => {
      return action.response;
    },
    [LOGIN_RECEIVE]: (state, action) => {
      return action.response;
    },
    [LOGOUT_RECEIVE]: () => {
      return null;
    },
  }),
});
