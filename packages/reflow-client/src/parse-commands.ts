import {requireGlob} from './utils';

export
const parseCommands = function(dir?: string): any[] {
  const commandsPath = dir || 'commands/**/*.js';

  return requireGlob(commandsPath)
}
