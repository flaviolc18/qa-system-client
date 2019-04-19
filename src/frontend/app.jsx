import React from 'react';
import ReactDOM from 'react-dom';

import Index from './pages/Index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './app.scss';

ReactDOM.hydrate(<Index />, document.getElementById('root'));
