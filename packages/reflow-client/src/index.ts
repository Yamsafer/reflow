import * as webdriverio from 'webdriverio';

export
interface ClientConfig {
  remoteOptions: webdriverio.RemoteOptions
  // connection: any,
  // capabilities: webdriverio.RemoteOptions,
  // config: any,
  // customActions: any,
}

// const chooseClient = (capability: any) => {
//   if(capability.browserName) return import('./browser');
//   if(/ios|android/i.test(capability.platform)) return import('./native');
// }

import * as fs from 'fs'
import * as path from 'path';
export
const parseCommands = function(dir?: string) {
  const commandsPath = dir || path.join(process.cwd(), 'commands');

  const commands = fs.readdirSync(commandsPath)
    .map(file => path.join(commandsPath, file))
    .map(fullPath => require(fullPath))

  return commands;
}

import * as flow from './commands/flow-variables';


export
async function createClient(clientConfig: ClientConfig) {
  const {
    remoteOptions,
    // capabilities,
  } = clientConfig;

  const client = await webdriverio.remote(remoteOptions, function(client: any) {
    client.flow = flow;
    return client;
  });

  const commands = parseCommands();
  console.log('commands:::', commands)
  return client
  // return client.init();
  // console.log('returning client')
  // return client;
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
