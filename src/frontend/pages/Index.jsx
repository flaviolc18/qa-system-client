import React from 'react';
import { Router } from '@reach/router';
import PropTypes from 'prop-types';

import Home from './Home';
import Test from './Test';

import Navbar from '../components/Navbar';
import Feed from '../components/Feed';
const links = [
  { label: 'Home', class: 'navigation', type: 'link', to: '/home' },
  {
    label: (
      <div>
        Logout
        {'  '}
        <i className="fas fa-sign-out-alt" />
      </div>
    ),
    class: 'action',
    type: 'button',
    action: () => alert('Logout'),
  },
  { label: 'Dropdown', class: 'navigation', type: 'dropdown', links: [{ label: 'Teste', to: 'Teste' }] },
];
const FullPage = ({ children }) => (
  <div>
    <Navbar to="home" title={'UFMG Q&A'} links={links} />
    <Feed>{children}</Feed>
  </div>
);

FullPage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const NotFount = () => <div>Sorry, nothing here</div>;

const Index = () => (
  <Router>
    <FullPage path="/">
      <Home path="home" />
      <Test path="test" />
      <NotFount default />
    </FullPage>
  </Router>
);

export default Index;
