'use strict';
const appiumMiddleware = require('./lib');
if(process.env.REFLOW_DEVELOPMENT) {
  const express = require('express');
  const app = express();
  app.use(appiumMiddleware());

  app.listen(9090, function() {
    console.log(`Development Server Running on port ${9090}`);
  });
}
module.exports = appiumMiddleware

