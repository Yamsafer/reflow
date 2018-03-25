const express = require('express');

module.exports = function() {
  const router = express.Router();
  router.get('/', function(req, res) {
    res.status(200).send('Hello From Automation!');
  })
  router.use('/appium', require('./routes/appium')({
    throwInsteadOfExit: true,
    loglevel: 'debug',
    port: 4723,
  }));

  router.use('/devices', require('./routes/devices')());

  return router;
}


