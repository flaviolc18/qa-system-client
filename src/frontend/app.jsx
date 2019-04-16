import React from 'react';
import ReactDOM from 'react-dom';

import App from './pages/App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

ReactDOM.hydrate(<App />, document.getElementById('root'));