const config = require('../config.json');

const cassandraSetup  = require('reflow-cassandra-connection/lib/setup');
cassandraSetup(config.cassandra);
