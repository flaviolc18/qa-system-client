import React from 'react';
import { Router } from '@reach/router';
import PropTypes from 'prop-types';

import Home from './Home';

import Navbar from '../components/Navbar';
import Feed from '../components/Feed';
import Login from './Login';
import RegistroUsuario from './RegistroUsuario';
import QuestionPage from './QuestionPage';
import PostarPergunta from './PostarPergunta';
import Perfil from './Perfil';

import FullPage from '../components/FullPage';

const NotFount = () => <div>Sorry, nothing here</div>;

const Index = () => (
  <Router>
    <FullPage path="/">
      <Login path="login" />
      <Perfil path="usuarios/:usuarioId" />
      <RegistroUsuario path="registro-usuario" />
      <Home path="home" />
      <QuestionPage path="questions/:id" />
      <PostarPergunta path="postar-pergunta" />
      <NotFount default />
    </FullPage>
  </Router>
);

export default Index;
