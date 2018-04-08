const express = require('express');
const httpProxy = require('http-proxy');

module.exports = function(opts) {
  const router = express.Router();
  const proxyServer = httpProxy.createProxyServer({});
  // await selenium.install(opts);
  // const seleniumChild = await selenium.start();
  router.use('/selenium-hub', require('./routes/selenium-hub')(opts));
  router.use(require('./routes/proxy')({
    proxyServer,
    proxyTarget: opts.proxyTarget,
  }));

  return router;
}
