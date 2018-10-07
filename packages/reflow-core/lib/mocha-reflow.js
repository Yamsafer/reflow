import Mocha from 'mocha';
import './interfaces/bdd';

import {createClient} from 'reflow-client';

Mocha.prototype.initClient = async function(remoteConfig, clientConfig) {
  this.client = await createClient(remoteConfig, clientConfig);
  return this.client
}

export default Mocha
