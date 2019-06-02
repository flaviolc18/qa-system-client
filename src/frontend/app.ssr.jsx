import React from 'react';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import Index from './pages/Index';
import { ServerLocation } from '@reach/router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/root-reducer';

const path = require('path');
const statsFile = path.resolve('./dist/loadable-stats.json');
const extractor = new ChunkExtractor({ statsFile });

export default function render(url) {
  const store = createStore(rootReducer);

  const jsx = extractor.collectChunks(
    <ServerLocation url={url}>
      <Provider store={store}>
        <Index />
      </Provider>
    </ServerLocation>
  );

  const html = renderToString(jsx);

  const scriptTags = extractor.getScriptTags();
  const linkTags = extractor.getLinkTags();
  const styleTags = extractor.getStyleTags();

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
      <link href="https://fonts.googleapis.com/css?family=Raleway|Source+Sans+Pro&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Dancing+Script|Great+Vibes|Kaushan+Script|Pacifico&display=swap" rel="stylesheet">    
${linkTags}
${styleTags}
      </head>
  <body>
    <div id="root">${html}</div>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
    ${scriptTags}
  </body>

  </html>
`;
}
