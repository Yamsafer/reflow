const elastic = require('./elastic');
const config = require('../config.json');

const elasticInstance = new Elastic(config);
elasticInstance.ping();
elasticInstance.setup();
