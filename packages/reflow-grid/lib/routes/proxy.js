const express = require('express');
const { URL } = require('url');

module.exports = function({ proxyServer }) {
  const router = express.Router();
  function proxyMiddleware(req, res, next) {
    console.log('Proxying request: ', req.url);
    try {
      proxyServer.web(req, res, {
        target: 'http://localhost:4444',
      });
    } catch(err) {
      console.log('Error in proxy Selenium Middleware:', err);
      next(err);
    }
  }
  router.all('/wd/*', proxyMiddleware);
  router.all('/grid/*', proxyMiddleware);
  return router;
}


