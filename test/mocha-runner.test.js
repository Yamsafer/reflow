import MochaRefow from '../src/mocha-runner'
import mockFork from './fixture/reflow/mock-fork';

const subscribedSuites = {
  'Hooked Suite': '/Users/Bamieh/Bamieh/reflow/test/fixture/suite/hooked-describe',
  'Standard Suite': '/Users/Bamieh/Bamieh/reflow/test/fixture/suite/standard-describe',
};


describe("Mocha Runner", function() {

  it('Creates a mocha instance', function() {

    const instance = new MochaRefow(mockFork, {
       reporter: 'list'
    })

    mockFork.suites.forEach(branch => {
      const suitePath = subscribedSuites[branch.name]
      instance.addFile(suitePath);
    })

    instance.run();

  })
})