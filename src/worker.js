require('babel-register')();
const MochaReflow = require('./mocha-reflow').default;
const createRunner = require('./runner/createRunner').default;
const {createContext} = require('./runner/Module');
const loadModules = require('./runner/loadModules').default;
const path = require('path');

let vmRunner;
let mochaReflowInstance;

const typesToPush = ["suite", "hook"];

const pushToMocha = ({ path }) => {
  mochaReflowInstance.files.push(path);
};

const executeSubTree = function(tree) {
  const suites = [].concat(tree.suites);
  suites.forEach(executeSuites);
}

const executeSuites = function(branch) {
  if(typesToPush.includes(branch.type)) {
    return pushToMocha(branch);
  }

  return executeSubTree(branch);
}


const executeTree = function(tree, done) {
  const treeName = tree.name;

  const requireList = [
    'babel-register',
    path.join(process.cwd(), './example/setup.js'),
  ]

  const mochaConfig = {
    environment: loadModules(require, requireList),
    ui: 'reflow-ui',
  }
  
  mochaReflowInstance = new MochaReflow(tree, mochaConfig);

  const suites = [].concat(tree.suites);
  
  suites.forEach(executeSuites);

  mochaReflowInstance.run(done) 
}




module.exports = executeTree