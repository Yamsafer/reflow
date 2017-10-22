require('babel-register')();
require('../test/setup')
const MochaReflow = require('./mocha-reflow');

let mochaReflowInstance;

const mochaConfig = {
  // reporter: 'landing',
  // reporter: function() {}
}


const executeSuite = ({ name, path }) => {
  // if(name === "NOOP") {
  //   return suiteDescriptor();
  // }
  mochaReflowInstance.loadFile(path, function(suite) {
    // better create a new suite for subflow, and add the before for it.
    // current implementation will suffer because it adds to the before of the suite not the whole suites.
    // additionally we have to strinfigy the functions in order to pass them to the thread. ouch.
    if(suite.title === "Suite D") {
      suite.beforeAll('Before Subflow: Basic Subflow', function() {
        console.log('Before Basic Subflow..')
      })
    }
  });
};

const executeSubTree = function(tree) {
  const suites = [].concat(tree.suites);
  suites.forEach(executeSuites);
}

const executeSuites = function(branch) {
  if(branch.type === "suite") {
    return executeSuite(branch);
  }

  return executeSubTree(branch);
}


const executeTree = function(tree, done) {
  const treeName = tree.name;

  mochaReflowInstance = new MochaReflow(tree, mochaConfig)

  const suites = [].concat(tree.suites);
  suites.forEach(executeSuites);

  mochaReflowInstance.run(done) 
}




module.exports = executeTree