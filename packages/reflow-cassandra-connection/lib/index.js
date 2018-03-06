const connection = require('./connection');

const models = require('express-cassandra');
const util = require('util');

const errorUDT = require('./models/errorType');
const metadataUDT = require('./models/metadataType');
const testUDT = require('./models/testType');

const retryPolicy = require('./retry-policy');
const reconnectionPolicy = require('./reconnection-policy');

module.exports = async function(config) {
  console.log('Binding models.');
  const bindModels = util.promisify(models.setDirectory( __dirname + '/models').bind);

  try {
    await bindModels({
      clientOptions: {
        contactPoints: config.contactPoints,
        protocolOptions: { port: 9042 },
        keyspace: config.keyspace,
        queryOptions: {
          consistency: models.consistencies.one,
          prepare: true,
        },
        authProvider: new models.driver.auth.PlainTextAuthProvider(config.username, config.password),
        policies: {
          retry: retryPolicy(models.driver.policies.retry),
          reconnection: reconnectionPolicy(models.driver.policies.reconnection),
        }
      },
      ormOptions: {
        defaultReplicationStrategy : {
          class: 'SimpleStrategy',
          replication_factor: 1
        },
        migration: 'safe',
        udts: {
          error: errorUDT,
          metadata: metadataUDT,
          test: testUDT,
        },
      }
    });
    console.log('Binding Complete.')
    return connection(models)
  } catch(err) {
    console.error('Error binding models.');
    throw err;
  }
};










