const express = require('express');
const httpProxy = require('http-proxy');
const selenium = require('./selenium');

const path = require('path');

module.exports = async function() {
  const proxyServer = httpProxy.createProxyServer({});
  await selenium.install();
  const seleniumChild = await selenium.start();
  const router = express.Router();

  router.use('/appium', require('./routes/appium')({
    throwInsteadOfExit: true,
    loglevel: 'debug',
    nodeconfig: require.resolve(path.join(__dirname, './node-config-bootstrap.json')),
    port: '4723',
  }));

  router.use('/devices', require('./routes/devices')());
  router.use('/selenium-hub', require('./routes/selenium-hub')(seleniumChild));

  router.use(require('./routes/proxy')({
    proxyServer,
  }));

  return router;
}
