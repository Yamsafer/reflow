import Mocha from 'mocha';
import './interfaces/bdd';

import {createClient} from 'reflow-client';

Mocha.prototype.initClient = async function(clientSettings) {
  this.client = await createClient(clientSettings);
  return this.client
}

export default Mocha
