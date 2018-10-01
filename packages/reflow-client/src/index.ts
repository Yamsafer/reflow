// import * as logger from './commands/logger';
import * as webdriverio from 'webdriverio';
import {parseCommands} from './parse-commands';
import * as flow from './commands/flow-variables';

export
interface ClientConfig {
  remoteOptions: webdriverio.RemoteOptions
}

export
function createClient(clientConfig: ClientConfig) {
  const {
    remoteOptions,
  } = clientConfig;

  return webdriverio.remote(remoteOptions, function(client: any) {
    client.flow = flow
    // client.log = logger

    const commands = parseCommands();

    commands.forEach(command => {
      console.log('command:', command);
    })

    return client;
  });
}
