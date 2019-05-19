import React from 'react';
import { renderToString } from 'react-dom/server';

import Index from './pages/Index';
import { ServerLocation } from '@reach/router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/root-reducer';

export default function render(url) {
  const store = createStore(rootReducer);

  const html = renderToString(
    <ServerLocation url={url}>
      <Provider store={store}>
        <Index />
      </Provider>
    </ServerLocation>
  );
  const preloadedState = store.getState();

  return `
  <!DOCTYPE html>
  <html lang="pt-br">
  <head>
  <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
      integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
      crossorigin="anonymous"
      />

      <title>Não faço a Menor Ideia</title>
      <link href="https://fonts.googleapis.com/css?family=Dancing+Script|Great+Vibes|Kaushan+Script|Pacifico&display=swap" rel="stylesheet">    
      <link href="/assets/main.css" rel="stylesheet" type="text/css"/>
  </head>
  <body>
    <div id="root">${html}</div>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
    <script type="text/javascript" src="/assets/bundle.js"></script>
  </body>
  </html>
`;
}
