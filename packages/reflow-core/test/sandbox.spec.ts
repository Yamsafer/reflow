/// <reference path="typings/globals.d.ts" />
import {getAliasNamesFromFile} from '../src/sandbox'
const subflowName = "test";

const subflowContent = `subflow("${subflowName}", () => {});`
const multiSubflowContent = subflowContent + subflowContent

describe("Sandbox", function() {
  describe("getAliasNamesFromFile", function() {
    it("returns a list of aliases", function() {
      const aliases = getAliasNamesFromFile(subflowContent)
      expect(aliases).to.deep.equal([subflowName]);
    })
    it("works on mutlple aliases in the same file", function() {
      const aliases = getAliasNamesFromFile(multiSubflowContent)
      expect(aliases).to.deep.equal([subflowName, subflowName]);
    })
    it("resets sandbox after every run", function() {
      const aliases = getAliasNamesFromFile(subflowContent)
      expect(aliases).to.deep.equal([subflowName]);
      expect(aliases).to.deep.equal([subflowName, subflowName]);
    })
  })
})
