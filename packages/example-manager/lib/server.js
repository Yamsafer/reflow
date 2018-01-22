const express = require('express');
const cors    = require('cors');

const config = require('../config.json');
const Elastic = require('./elastic');
const circuit = require('reflow-circuit');
const board   = require('reflow-board');

const app = express();
const elasticInstance = new Elastic(config);

app.use(cors());
elasticInstance.ping();

app.use(circuit.middleware({
  elastic: elasticInstance.client,
}))

app.use(board());

app.listen(config.port, function() {
  console.log(`Server Running on port ${config.port}`)
});
