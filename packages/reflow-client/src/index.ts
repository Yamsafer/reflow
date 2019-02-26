import {
  remote,
} from 'webdriverio';

import {
  Options,
} from 'webdriver';

import {
  reflowClient,
  ClientConfig,
} from './reflow-client'

export {
  ClientConfig,
}

export
function createClient(remoteOptions :Options, clientConfig: ClientConfig) {
  const client = reflowClient(clientConfig);
  return remote(remoteOptions, client);
}
