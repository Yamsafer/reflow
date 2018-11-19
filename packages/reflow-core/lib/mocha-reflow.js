const Mocha = require('mocha');
import './interfaces/bdd';

const {createClient} = require('reflow-client');

Mocha.prototype.initClient = async function(remoteConfig, clientConfig) {
  this.client = await createClient(remoteConfig, clientConfig);
  return this.client
}

export default Mocha
