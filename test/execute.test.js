import basicTree from './fixture/tree/basic'
import {
  executeTree,
  setSuiteDefinitions,
} from '../src/execute'

const suiteDefinitions = {
  'Hooked Suite': '/Users/Bamieh/Bamieh/reflow/test/fixture/suite/hooked-describe',
  'Standard Suite': '/Users/Bamieh/Bamieh/reflow/test/fixture/suite/standard-describe',
}

describe("execute", function() {

  describe("executeTree", function() {
    before(function() {
      setSuiteDefinitions(suiteDefinitions)
    })

    it('is a funciton', function() {
      expect(executeTree).to.be.a('function')
    })
    it('executes a basic tree', function() {
      const execution = executeTree(basicTree)
      return expect(execution).to.eventually.be.fulfilled
    })
    // it('executes a complex tree', function() {
    //   console.log('Comp')
    // })
  })

})
