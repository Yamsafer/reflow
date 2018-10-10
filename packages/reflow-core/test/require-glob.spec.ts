/// <reference path="typings/globals.d.ts" />

import {requireGlob} from '../src/utils/require-glob'
import * as path from 'path';
import {customCommand} from './fixture/commands/sample'

describe("Parse Commands", function() {
  const fixtureCommandsPath = path.join(__dirname, './fixture/commands');
  const invalidPath = path.join(__dirname, './fixture/not-a-valid-dir');
  let commands: any[];
  it("returns emtpy array when no custom commands are found", function() {
    const commands = requireGlob(invalidPath);
    expect(commands).to.be.an('array').and.to.be.empty
  })
  it.skip("looks for command in custom dir", function() {
    commands = requireGlob(fixtureCommandsPath);
    expect(commands).to.be.an('array').and.to.have.length(1);
  })
  it.skip("returns a list of commands", function() {
    expect(commands).to.deep.equal([customCommand])
  })
})
