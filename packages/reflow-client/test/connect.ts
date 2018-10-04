import {
  createClient,
  ClientConfig,
} from '../src/index';

const config:ClientConfig = {
  commandsPath: 'test/fixture/commands/**/*.ts',
  remoteOptions: {
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
}


export
const connectClient = () => createClient(config);
