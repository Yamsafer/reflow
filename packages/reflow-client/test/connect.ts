import {
  createClient,
  ClientConfig,
} from '../src/index';

const config = {
  hostname: "automation.yamsafer.com",
  waitforTimeout: 150000,
  connectionRetryCount: 1,
  logLevel: 'trace',
  capabilities: {
    browserName: "chrome",
    seleniumProtocol: "WebDriver",
    applicationName: "TheShip Debug 3",
  },
}

export
const connectClient = function() {
  const clientConfig:ClientConfig = {
    remoteOptions: config,
  };
  return createClient(clientConfig);
}
