/// <reference path="typings/globals.d.ts" />
import {
  runInSandbox,
  getFileContent
} from '../src/sandbox'

import * as path from 'path';
const cwd = process.cwd()

const getFixturePath = path.join.bind(path, cwd, './test/fixture')
const suiteFilepath = getFixturePath('suites/suite1.js');

describe("Sandbox", function() {
  it("parses a filepath content", async function() {
    const content = await getFileContent(suiteFilepath)
    expect(content).to.be.a.string;
    expect(content).to.equal(`describe("Suite 1")\n`);
  })
  it("runs a given filepath in a vm context", async function() {
    let suiteName: string = '';
    const customContext = {
      describe(title: string) {
        suiteName = title
      },
    }
    await runInSandbox(suiteFilepath, customContext)
    expect(suiteName).to.equal('Suite 1');
  })
})
