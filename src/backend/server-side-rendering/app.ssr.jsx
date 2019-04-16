import React from 'react';
import { renderToString } from 'react-dom/server';

import Index from '../../frontend/pages/Index';
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