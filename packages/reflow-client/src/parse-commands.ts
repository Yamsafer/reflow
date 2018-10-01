import * as fs from 'fs'
import * as path from 'path';

export
const parseCommands = function(dir?: string): any[] {
  const commandsPath = dir || path.join(process.cwd(), 'commands');
  const pathExists = fs.existsSync(commandsPath);
  if(!pathExists) return [];

  const commands = fs.readdirSync(commandsPath)
    .map(file => path.join(commandsPath, file))
    .map(fullPath => require(fullPath))

  return commands
}
