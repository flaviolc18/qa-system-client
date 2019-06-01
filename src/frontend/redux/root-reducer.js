import { combineReducers } from 'redux';

import { app } from './sessions.redux';
import { perguntas } from './perguntas.redux';
import { respostas } from './respostas.redux';
import { usuarios } from './usuarios.redux';
import { imagens } from './imagens.redux';
import { votes } from './votes.redux';
import { tags } from './tags.redux';

export default combineReducers({ app, perguntas, respostas, usuarios, imagens, votes, tags });
