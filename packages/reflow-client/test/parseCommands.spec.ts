/// <reference path="typings/globals.d.ts" />

import {parseCommands} from '../src'
import * as path from 'path';
import * as sampleCommand from './fixture/commands/sample'

describe("parse Commands", function() {
  let commands: any[];
  it("looks for commands in pwd/commands", function() {
    const expectedPath = path.join(process.cwd(), './commands');
    try {
      parseCommands();
      throw Error();
    } catch(err) {
      expect(err.code).to.equal('ENOENT');
      expect(err.path).to.equal(expectedPath)
    }
  })
  it("looks for command in custom dir", function() {
    const fixtureCommandsPath = path.join(__dirname, './fixture/commands');
    commands = parseCommands(fixtureCommandsPath);
    expect(commands).to.be.an('array').and.to.have.length(1);
    // console.log('commands::', commands)
  })
  it("returns a list of commands", function() {
    expect(commands).to.deep.equal([sampleCommand])
  })
})
