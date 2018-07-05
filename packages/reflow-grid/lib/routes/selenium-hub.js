const express = require('express');
const selenium = require('../selenium');

module.exports = function(opts) {
  const router = express.Router();
  let seleniumChild;
  router.get('/install', async function(req, res) {
    try {
      await selenium.install(opts);
      res.status(200).send('Install Complete!');
    } catch(err) {
      res.status(500).json({
        description: 'Error Installing Selenium Hub.',
        message: err.message,
      });
    }
  })

  router.get('/start', async function(req, res) {
    try {
      if(seleniumChild) await seleniumChild.kill();
      seleniumChild = null;
      seleniumChild = await selenium.start(opts);
      res.status(200).send('Service Started!');
    } catch(err) {
      res.status(500).json({
        description: 'Error Starting Selenium Hub.',
        message: err.message,
      });
    }
  })
  router.get('/stop', async function(req, res) {
    try {
      await seleniumChild.kill();
      seleniumChild = null;
      res.status(200).send('Service Stopped!');
    } catch(err) {
      res.status(500).json({
        description: 'Error Stopping Selenium Hub.',
        message: err.message,
      });
    }
  })

  return router;
}


