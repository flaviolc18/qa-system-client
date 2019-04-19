import React, { Component } from 'react';
import Home from './Home';
import { Router } from '@reach/router';

const FullPage = ({ children, location }) => <div>{children}</div>;
const NotFount = () => <div>Sorry, nothing here</div>;

const Index = () => (
  <Router>
    <FullPage path="/">
      <Home path="home" />
      <NotFount default />
    </FullPage>
  </Router>
);

export default Index;
