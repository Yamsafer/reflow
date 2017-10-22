require('babel-register')();
require('../test/setup')
const MochaReflow = require('./mocha-reflow');

const executeSuite = ({ name, path }) => {
  // if(name === "NOOP") {
  //   return suiteDescriptor();
  // }
  return mochaReflowInstance.addFile(path);
};


const mochaConfig = {
  reporter: 'landing',
  // reporter: function() {

  // }
}

const runReflowInstance = function () {
  return new Promise((resolve, reject) => {
    mochaReflowInstance.run(function(failures) {
      if(failures) return reject(failures);
      resolve();
    })
  })
}
const executeTree = function(tree, done) {
  const treeName = tree.name;
  console.log('name::', treeName)
  if(tree.type === "fork") {
    console.log('forking: ', treeName)
    mochaReflowInstance = new MochaReflow(tree, mochaConfig)
  }

  const suites = [].concat(tree.suites);
  suites.forEach(executeSuites);

  mochaReflowInstance.run(done)
}

const executeSuites = function(branch) {
  if(branch.type === "suite") {
    return executeSuite(branch);
  }

  return executeTree(branch);
}


module.exports = executeTree