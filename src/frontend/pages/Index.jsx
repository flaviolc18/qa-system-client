import React from 'react';
import { Router } from '@reach/router';

import FullPage from '../components/FullPage';

import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import QuestionPage from './QuestionPage';
import QuestionPost from './QuestionPost';
import Perfil from './Perfil';

const NotFount = () => (
  <div className="row justify-content-md-center">
    <h3>
      Desculpe, mas não tem nada aqui! <i className="fas fa-sad-tear" />
    </h3>
  </div>
);

const Index = () => (
  <Router>
    <FullPage path="/">
      <SignIn path="login" />
      <Perfil path="usuarios/:usuarioId" />
      <SignUp path="registro-usuario" />
      <Home path="home" />
      <QuestionPage path="perguntas/:id" />
      <QuestionPost path="postar-pergunta" />
      <NotFount default />
    </FullPage>
  </Router>
);

export default Index;
