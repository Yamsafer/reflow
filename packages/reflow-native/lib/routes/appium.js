const express = require('express');
const appium = require("appium/build/lib/main").main;

module.exports = function(config) {
  const router = express.Router();
  let server;

  router.get('/doctor', async function(req, res) {
    // "doctor:ios": "appium-doctor --ios",
    // "doctor:android": "appium-doctor --android",
  });

  router.get('/start', async function(req, res) {
    if(server) {
      res.status(500).send(`Appium server already started.`);
      return;
    }

    try {
      server = await appium(config);
      res.status(200).send(`Appium server is launched.`);
    } catch(err) {
      console.error('Appium server isn\'t launched successfully: ', err);
      res.status(500).json({
        description: 'Appium server isn\'t launched successfully.',
        message: err.message,
      });
    }
  });

  router.get('/stop', async function(req, res) {
    if(!server) {
      res.status(500).send('Appium server is not launched.');
      return;
    }

    try {
      await server.close();
      server = null;
      res.status(200).send(`Appium server stopped.`);
    } catch(err) {
      console.error('Appium server isn\'t stopped successfully', err);
      res.status(500).json({
        description: 'Appium server isn\'t stopped successfully.',
        message: err.message,
      });
    }
  });

  return router;
}


