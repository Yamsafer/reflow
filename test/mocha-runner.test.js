import {createInstance} from '../src/mocha-runner'

const subscribedSuites = {
  'Mock Suite': '/Users/Bamieh/Bamieh/reflow/test/fixture/mock-describe'
};


describe("Mocha Runner", function() {

  it('Creates a mocha instance', function(done) {
    const mochaRunner = createInstance({
       reporter: 'list'
    })
    const mockSuitePath = subscribedSuites['Mock Suite'];
    console.log('mockSuitePath::', mockSuitePath)
    mochaRunner.addFile(mockSuitePath);

    const runnerInstance = mochaRunner.run(function(failures){
        console.log('failures::', failures);
        // done()
    });

    runnerInstance.on('test', function() {
      console.log('on test start');
    })
    runnerInstance.on('end', function() {
      // console.log('hi');
      done()
    })

  })
})