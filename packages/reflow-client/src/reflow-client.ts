import {getFlow} from './commands/flow-variables';
import * as getLogger from 'wdio-logger';

export
interface Command {
  (...any: any[]): any
  name: string,
}

export
interface ClientConfig {
  commands?: Command[]
}

export
const reflowClient = (clientConfig: ClientConfig) => (client: any) => {
  const {
    commands = [],
  } = clientConfig

  client.flow = getFlow();
  client.logger = getLogger('client');

  commands.forEach(command => {
    client.addCommand(command.name, command)
  })

  client.teardown = async function() {
    client.logger.debug("Running client teardown.");
    client.flow.teardown();
    return client.deleteSession();
  }

  return client;
}
