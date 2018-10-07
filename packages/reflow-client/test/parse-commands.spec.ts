/// <reference path="typings/globals.d.ts" />

import {parseCommands} from '../src/parse-commands'
import * as path from 'path';
import * as sampleCommand from './fixture/commands/sample'

describe("Parse Commands", function() {
  let commands: any[];
  it("returns emtpy array when no custom commands are found", function() {
    const commands = parseCommands();
    expect(commands).to.be.an('array').and.to.be.empty
  })
  it.skip("looks for command in custom dir", function() {
    const fixtureCommandsPath = path.join(__dirname, './fixture/commands');
    commands = parseCommands(fixtureCommandsPath);
    expect(commands).to.be.an('array').and.to.have.length(1);
  })
  it.skip("returns a list of commands", function() {
    expect(commands).to.deep.equal([sampleCommand])
  })
})
