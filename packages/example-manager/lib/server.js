const express              = require('express');
const cors                 = require('cors');
const config               = require('../config.json');
const circuit              = require('reflow-circuit');
const board                = require('reflow-board');
const cassandraConnection  = require('reflow-cassandra-connection');

const app = express();
app.use(cors());

app.use(circuit({
  connection: cassandraConnection(config.cassandra),
}));

// app.use(board());

app.listen(config.port, function() {
  console.log(`Server Running on port ${config.port}`)
});
