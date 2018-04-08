const express = require('express');
const { URL } = require('url');

module.exports = function({ proxyServer, proxyTarget }) {
  const router = express.Router();
  function proxyMiddleware(req, res, next) {
    const target = proxyTarget || 'http://localhost:4444';
    console.log(`[Reflow Grid] Proxying request: ${req.url} -> ${target}`);
    return proxyServer.web(req, res, {
      target,
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


