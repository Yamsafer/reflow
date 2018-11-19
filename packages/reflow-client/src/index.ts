import {
  remote,
  RemoteOptions,
} from 'webdriverio';

import {
  reflowClient,
  ClientConfig,
} from './reflow-client'

export {
  ClientConfig,
  RemoteOptions
}

export
function createClient(remoteOptions: RemoteOptions, clientConfig: ClientConfig) {
  const client = reflowClient(clientConfig);
  return remote(remoteOptions, client);
}
