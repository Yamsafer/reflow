import * as webdriverio from 'webdriverio';

export
interface ClientConfig {
  remoteOptions?: webdriverio.RemoteOptions
  // connection: any,
  // capabilities: webdriverio.RemoteOptions,
  // config: any,
  // customActions: any,
}

// const chooseClient = (capability: any) => {
//   if(capability.browserName) return import('./browser');
//   if(/ios|android/i.test(capability.platform)) return import('./native');
// }

export
async function createClient(clientConfig: ClientConfig) {
  const {
    // remoteOptions,
    capabilities,
  } = clientConfig;
  console.log('capabilities::', capabilities)

  const client = webdriverio.remote(capabilities);
  return client;
  // const {
  //   capability,
  //   config,
  //   customActions,
  // } = clientConfig;
  // // webdriverio
  // const Client = await chooseClient(capability);
  // const client = new Client(driver, config);
  // await client.init({ capability, customActions })
  // return client;
}
