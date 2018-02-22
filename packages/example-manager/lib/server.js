const express              = require('express');
const cors                 = require('cors');
const config               = require('../config.json');
const circuit              = require('reflow-circuit');
const board                = require('reflow-board');
const createCassandraConnection  = require('reflow-cassandra-connection');

const app = express();
app.use(cors());

createCassandraConnection(config.cassandra)
  .then(cassandraConnection => {
    app.use(circuit({
      connection: cassandraConnection,
    }));

    app.use(board());

    app.listen(config.port, function() {
      console.log(`Server Running on port ${config.port}`)
    });
  })
  .catch(err => {
    throw err;
  })
