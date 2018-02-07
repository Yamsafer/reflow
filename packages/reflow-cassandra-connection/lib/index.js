const {createClient} = require('./util');
const connection = require('./connection');

module.exports = config => {
  const client = createClient(config.keyspace, config);
  return connection(client);
};
