/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
'use strict';

const { default: render } = require('../../../dist/app.ssr');

/* eslint no-console:0 */
module.exports = function handleRender(req, reply) {
  try {
    reply
      .header('Content-Type', 'text/html; charset=utf-8')
      .setCookie('teste', 'aaa', { path: '/' })
      .send(render(req.raw.url));
  } catch (e) {
    console.error(e);
    reply.status(500).send(e.message);
  }
};
