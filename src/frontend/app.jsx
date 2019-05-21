import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { loadableReady } from '@loadable/component';

import store from './redux/store';

import Index from './pages/Index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './app.scss';

loadableReady(() => {
  const root = document.getElementById('root');
  ReactDOM.hydrate(
    <Provider store={store}>
      <Index />
    </Provider>,
    root
  );
});
