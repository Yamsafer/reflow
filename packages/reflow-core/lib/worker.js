require('babel-register')();
const MochaReflow = require('./mocha-reflow').default;
const reflowProps = require('./props');
const decache = require('decache');

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


const executeTree = function({tree, mochaConfig, flowDetails, jobDetails}, done) {

  const {
    require: mochaRequiredFiles,
    ...mochaRestConfigs
  } = mochaConfig


  mochaRequiredFiles.forEach(mod => {
    require(mod);
  })

  global.reflow = reflowProps;
  const mochaReflowConfig = Object.assign({}, mochaRestConfigs, {
    ui: 'reflow-bdd',
    reporter: 'reflow-reporter',
    reporterOptions: {
      batch: true,
      flowDetails,
      jobDetails,
    },
  });


  mochaReflowInstance = new MochaReflow(mochaReflowConfig);

  const suites = [].concat(tree.suites);

  suites.forEach(executeSuites);

  mochaReflowInstance.run(failures => {
    mochaReflowInstance.files.forEach(decache)
    global.reflow.teardown()
    done(failures)
  })
}




module.exports = executeTree
