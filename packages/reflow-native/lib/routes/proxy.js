const express = require('express');
const { URL } = require('url');

module.exports = function({ proxyServer }) {
  const router = express.Router();

  router.all('*', function(req, res, next) {
    try {
      const url = new URL(req.url);
      console.log('url::', url)
      if(url.port !== '4723') return next();
      console.log('url.origin::', url.origin);
      proxyServer.web(req, res, {
        // target: 'http://localhost:4723'
        // target: req.originalUrl,
        target: url.origin,
      });
    } catch(err) {
      next();
    }
  })

  return router;
}


