import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import callAPIMiddleware from './middlewares/call-api-middleware';
import logger from 'redux-logger';
import rootReducer from './root-reducer';

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

export const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunkMiddleware, callAPIMiddleware, logger)
);

export default store;
