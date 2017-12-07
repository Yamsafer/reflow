const path = require('path');

const reCircuit = require('reflow-circuit');
const reBoard = require('reflow-board');
const elasticsearch = require('elasticsearch');
const cors = require('cors')

const express = require('express');

const config = {
  elasticHost: 'localhost:9200',
  log: 'trace'
}

async function init() {
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

  app.use('/', reCircuit({
    elastic: elasticClient,
  }))

  app.use('/', reBoard());

  app.listen(3000);
}

init();
