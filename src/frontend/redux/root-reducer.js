import { combineReducers } from 'redux';

import { perguntas } from './perguntas.redux';
import { respostas } from './respostas.redux';
import { usuarios } from './usuarios.redux';

export default combineReducers({ perguntas, respostas, usuarios });
