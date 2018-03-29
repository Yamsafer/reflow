const express = require('express');
const httpProxy = require('http-proxy');

module.exports = function() {
  const proxy = httpProxy.createProxyServer({});

  const router = express.Router();

  router.use('/appium', require('./routes/appium')({
    throwInsteadOfExit: true,
    loglevel: 'debug',
    port: 4723,
  }));

  router.use('/devices', require('./routes/devices')());

  router.all('*', function(req, res, next) {
    console.log('req::', req);
    proxy.web(req, res, {
      target: 'http://localhost:4723'
    });
    // next();
  })
  return router;
}
