const elasticsearch = require('elasticsearch');
const cors = require('cors')

const express = require('express');

const config = {
  log: 'trace'
}

function init() {
  const app = express();
  app.use(cors());

  const elasticClient = new elasticsearch.Client({
    host: config.elasticHost,
    log: config.log,
  });

  elasticClient.ping({}, function (error) {
    if (error) {
      console.trace('elasticsearch cluster is down!');
    } else {
      console.log('All is well');
    }
  });

  app.use(require('reflow-circuit')({
    elastic: elasticClient,
  }))

  app.use(require('reflow-board')());

  app.listen(3000, function() {
    console.log('Server Running on port 3000')
  });
}

init();
