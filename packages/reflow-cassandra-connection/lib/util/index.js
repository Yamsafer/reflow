const cassandra = require('cassandra-driver');

const authStrategy = (username, password) => {
  return new cassandra.auth.PlainTextAuthProvider(username, password);
}

const createClient = (keyspace, {contactPoints, username, password}) => {
  const clientOpts = {
    contactPoints,
    queryOptions: {
      prepare: true,
    }
  };

  if (keyspace) {
    clientOpts.keyspace = keyspace;
  }

  if (username && password) {
    clientOpts.authProvider = authStrategy(username, password);
  } else {
    console.info('No detected username/password combination was passed in.');
  }

  return new cassandra.Client(clientOpts);
}

module.exports = {
  createClient
}
