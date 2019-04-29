import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux/store';

import Index from './pages/Index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './app.scss';

ReactDOM.hydrate(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.getElementById('root')
);
