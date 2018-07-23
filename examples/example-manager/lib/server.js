const express              = require('express');
const cors                 = require('cors');
const circuit              = require('reflow-circuit');
const board                = require('reflow-board');
const grid                 = require('reflow-grid');
const cassandraConnection  = require('reflow-cassandra-connection');
const env                  = require('dotenv').config().parsed;

;(async function() {
  const app = express();
  app.disable('x-powered-by');
  app.enable('trust proxy');
  app.use(cors());
  const connection = await cassandraConnection({
    keyspace: env.CASSANDRA_KEYSPACE,
    contactPoints: env.CASSANDRA_CONTACT_POINTS.split(','),
    replication: "{ 'class': 'SimpleStrategy', 'replication_factor' : 1 }",
    username: env.CASSANDRA_USERNAME,
    password: env.CASSANDRA_PASSWORD,
  });

  app.use(circuit({
    connection,
  }));

  // app.use(board());
  // app.use(grid());

  app.all('*', function(req, res) {
    console.log('Invalid route recieved: ', req.url);
    res.status(404).send('404. Invalid Route.');
  });

  app.listen(env.PORT, function() {
    console.log(`Server Running on port ${env.PORT}`)
  });
})();
