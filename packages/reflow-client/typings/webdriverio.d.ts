declare module "webdriverio" {
  export
  function remote(params: RemoteOptions, remoteModifier?: any): any;

  export
  interface DesiredCapabilities {
  }

  export
  interface RemoteOptions {
    // desiredCapabilities: DesiredCapabilities[],
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
}
