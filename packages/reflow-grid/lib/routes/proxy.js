const express = require('express');
const { URL } = require('url');

module.exports = function({ proxyServer, target }) {
  const router = express.Router();
  function proxyMiddleware(req, res, next) {
    console.log('Proxying request: ', req.url);
    return proxyServer.web(req, res, {
      target: target || 'http://localhost:4444',
    });
  }

  proxyServer.on('error', function (err, req, res) {
    // res.writeHead(500, {
    //   'Content-Type': 'text/plain'
    // });
    console.log('Error in proxy Selenium Middleware:', err);
    res.status(500).json({
      description: 'Error reaching Selenium Hub',
      message: err.message,
    });

    // res.end('Something went wrong. And we are reporting a custom error message.');
  });

  router.all('/wd/*', proxyMiddleware);
  router.all('/grid/*', proxyMiddleware);
  return router;
}


