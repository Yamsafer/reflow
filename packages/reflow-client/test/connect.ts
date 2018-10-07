import {
  createClient,
  ClientConfig,
  RemoteOptions,
} from '../src/index';

const remoteOptions: RemoteOptions = {
  hostname: "automation.yamsafer.com",
  waitforTimeout: 150000,
  connectionRetryCount: 1,
  logLevel: 'trace',
  capabilities: {
    browserName: "chrome",
    seleniumProtocol: "WebDriver",
    applicationName: "TheShip Debug 1",
  },
}

const config:ClientConfig = {}

export
const connectClient = () => createClient(remoteOptions, config);
