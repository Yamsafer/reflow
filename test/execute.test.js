import executeMatrix, {
  executeTree,
  setSuiteDefinitions,
  decacheSuiteDefinitions,
} from '../src/execute'

import {
  basicTree,
  withSuflowTree,
  complexTree,
  oneSuiteTree,
} from './fixture/tree'

import {
  basicMatrix,
} from './fixture/matrix'

const suiteDefinitions = {
  'Hooked Suite': '/Users/Bamieh/Bamieh/reflow/test/fixture/suite/hooked-describe',
  'Standard Suite': '/Users/Bamieh/Bamieh/reflow/test/fixture/suite/standard-describe',
  'Another Standard Suite': '/Users/Bamieh/Bamieh/reflow/test/fixture/suite/another-standard-describe',
}

describe("execute", function() {

  describe("executeTree", function() {
    before(function() {
      setSuiteDefinitions(suiteDefinitions)
    })
    afterEach(function() {
      console.log('decaching defs');
      decacheSuiteDefinitions();
    })

    it('is a funciton', function() {
      expect(executeTree).to.be.a('function')
    })
    it('executes basic trees', function(done) {
      console.log('=> Tree: basic start')
      const execution = executeTree(basicTree)
      
      execution.run(done)
    })
    it('executes tree multiple times', function(done) {
      console.log('=> Tree: basic start')
      const execution = executeTree(basicTree)
      // console.log('=> Tree: execution::', execution)
      execution.run(done)
    })
    it('executes trees with subflows', function(done) {
      console.log('=> Tree: subflows start')
      const execution = executeTree(withSuflowTree)
      execution.run(done)
    })
    it('executes one suite trees', function(done) {
      console.log('=> Tree: one suite start')
      const execution = executeTree(oneSuiteTree)
      execution.run(done)
    })
    it('executes complex trees', function(done) {
      console.log('=> Tree: comples start')
      const execution = executeTree(complexTree)
      execution.run(done)
    })
  })

  describe('execute Matrix', function() {
    it('is a function', function() {
      expect(executeMatrix).to.be.a('function')
    })
    it('executes basic matrices', function(done) {
      const execution = executeMatrix(basicMatrix, {
        name: "Basic Matrix",
        suiteDefinitions,
      })
      done()
      // execution.run(done)
    })

    describe('configs', function() {

    })
  })
})
