import {
  ClientConfig,
  RemoteOptions,
  createClient,
} from '../src';


const remoteOptions: RemoteOptions = {
  hostname: "automation.yamsafer.com",
  waitforTimeout: 150000,
  connectionRetryCount: 1,
  logLevel: 'trace',
  capabilities: {
    browserName: "chrome",
    seleniumProtocol: "WebDriver",
    applicationName: "TheShip Debug 2",
  },
}

export
const clientConfig:ClientConfig = {}

export
const connectClient = () => createClient(remoteOptions, clientConfig);
