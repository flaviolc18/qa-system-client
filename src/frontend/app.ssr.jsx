import React from 'react';
import { renderToString } from 'react-dom/server';

import Index from './pages/Index';
import { ServerLocation } from '@reach/router';

export default function render(url) {
  const html = renderToString(
    <ServerLocation url={url}>
      <Index />
    </ServerLocation>
  );

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
      integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
      crossorigin="anonymous"
    />
    <title>UFMG QeA</title>
    <link href="/assets/main.css" rel="stylesheet" type="text/css"/>
  </head>
  <body>
    <div id="root">${html}</div>
    <script type="text/javascript" src="/assets/bundle.js"></script>
  </body>
  </html>
`;
}
