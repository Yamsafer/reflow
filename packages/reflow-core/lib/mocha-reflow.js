const Mocha = require('mocha');
require('./interfaces/bdd');

const {createClient} = require('reflow-client');

Mocha.prototype.initClient = async function(remoteConfig, clientConfig) {
  this.client = await createClient(remoteConfig, clientConfig);
  return this.client
}

module.exports = Mocha
