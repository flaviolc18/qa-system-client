import React from 'react';
import { Router } from '@reach/router';
import loadable from '@loadable/component';

const FullPage = loadable(() => import('../components/FullPage'));
const Home = loadable(() => import('./Home'));
const SignUp = loadable(() => import('./SignUp'));
const QuestionPage = loadable(() => import('./QuestionPage'));
const QuestionPost = loadable(() => import('./QuestionPost'));
const Perfil = loadable(() => import('./Perfil'));
const EditPerfil = loadable(() => import('./EditPerfil'));
const ChangePassword = loadable(() => import('./ChangePassword'));
const SearchQuestions = loadable(() => import('./SearchQuestions'));

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
      <Perfil key="perfil-page" path="usuarios/:usuarioId" />
      <SignUp key="signup-page" path="registrar" />
      <Home key="home-page" path="/" />
      <QuestionPage key="question-page" path="perguntas/:id" />
      <QuestionPost key="question-post-page" path="postar-pergunta" />
      <EditPerfil key="edit-perfil-page" path="editar-perfil/:usuarioId" />
      <ChangePassword key="change-password-page" path="mudar-senha/:usuarioId" />
      <SearchQuestions key="search-question-page" path="perguntas/pesquisar" />
      <NotFount key="not-found-page" default />
    </FullPage>
  </Router>
);

export default Index;
