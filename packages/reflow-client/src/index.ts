import * as webdriverio from 'webdriverio';
import * as flow from './commands/flow-variables';
import * as getLogger from 'wdio-logger';

export
interface Command {
  name: string,
  handler: any,
}

export
interface ClientConfig {
  remoteOptions: webdriverio.RemoteOptions,
  commandsPath?: string,
  customCommands?: Command[]
}


export
function createClient(clientConfig: ClientConfig) {
  const {
    remoteOptions,
    customCommands = [],
  } = clientConfig;

  return webdriverio.remote(remoteOptions, function(client: any) {
    client.flow = flow
    client.logger = getLogger('reflow')

    customCommands.forEach(command => {
      console.log('command:', command);
    })

    return client;
  });
}
