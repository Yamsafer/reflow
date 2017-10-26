import MochaRefow from '../lib/mocha-reflow'
import Mocha from 'mocha'

import mockFork from './fixture/reflow/mock-fork';

const subscribedSuites = {
  'Hooked Suite': '/Users/Bamieh/Bamieh/reflow/test/fixture/suite/hooked-describe',
  'Standard Suite': '/Users/Bamieh/Bamieh/reflow/test/fixture/suite/standard-describe',
};

const mochaConfig = {
  reporter: function() {

  }
}
describe("Mocha Runner", function() {

  it('Creates a mocha instance', function() {
    const instance = new MochaRefow(mockFork, mochaConfig)
    expect(instance).to.be.an.instanceof(Mocha)
  })

  describe('`addFiles` Method', function() {
    before(function() {
      this.instance = new MochaRefow(mockFork, mochaConfig)
    })
    it("adds a file to the instance", function() {
      const suitePath = subscribedSuites['Standard Suite']
      this.instance.addFile(suitePath);
      expect(this.instance.files).to.contain(suitePath)
    })
  })

  describe("`run` Method", function() {
    before(function() {
      this.instance = new MochaRefow(mockFork, mochaConfig)
    })
  })
})