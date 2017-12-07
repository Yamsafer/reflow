const express = require('express');
const path = require('path');

const boardMiddleware = function(config) {
  const router = express.Router();
  const buildPath = path.join(__dirname, '/build/');

  router.use(express.static(buildPath));

  router.get('/', function (req, res) {
    res.sendFile(path.join(buildPath, 'index.html'));
  });

  return router
}

module.exports = boardMiddleware;


