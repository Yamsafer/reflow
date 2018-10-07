import * as Mocha from 'mocha';
import './interfaces/bdd';

import {
  createClient,
  ClientConfig,
} from 'reflow-client';

Mocha.prototype.initClient = async function(clientConfig: ClientConfig) {
  this.client = await createClient(clientConfig);
  return this.client
}

export { Mocha }
