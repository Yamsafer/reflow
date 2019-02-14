import {
  remote,
} from 'webdriverio';

import {
  reflowClient,
  ClientConfig,
} from './reflow-client'

export {
  ClientConfig,
}

interface DesiredCapabilities {}

export
interface RemoteOptions {
  capabilities: DesiredCapabilities,
  logLevel?: any,
  logOutput?: any,
  protocol?: any,
  host?: any,
  hostname?: any,
  port?: any,
  path?: any,
  agent?: any,
  proxy?: any,
  baseUrl?: any,
  connectionRetryTimeout?: any,
  connectionRetryCount?: any,
  coloredLogs?: any,
  deprecationWarnings?: any,
  bail?: any,
  screenshotPath?: any,
  screenshotOnReject?: any,
  waitforTimeout?: any,
  waitforInterval?: any,
  queryParams?: any,
  headers?: any,
}

export
function createClient(remoteOptions: RemoteOptions, clientConfig: ClientConfig) {
  const client = reflowClient(clientConfig);
  return remote(remoteOptions, client);
}
