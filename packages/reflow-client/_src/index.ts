import * as webdriverio from 'webdriverio';

export
interface ClientConfig {
  remoteOptions?: webdriverio.RemoteOptions
  // connection: any,
  // capability: any,
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
    remoteOptions,
  } = clientConfig;

  const client = webdriverio.remote(remoteOptions);
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
