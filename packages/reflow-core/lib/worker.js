require('babel-register')();
const MochaReflow = require('./mocha-reflow').default;
const reflowProps = require('./props');
const decache = require('decache');

const intercept = require("intercept-stdout");
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


const executeTree = function({tree, mochaConfig}, done) {
  const stdoutCapture = {
    treeIndex: tree.index,
    stdout: [],
  };

  const unhook_intercept = intercept(function(text) {
    stdoutCapture.stdout.push(text);
    return ""
  });

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
      meta: {
        jobId: '13',
      }
    },
  });


  mochaReflowInstance = new MochaReflow(mochaReflowConfig);

  const suites = [].concat(tree.suites);

  suites.forEach(executeSuites);

  mochaReflowInstance.run(failures => {
    unhook_intercept();
    mochaReflowInstance.files.forEach(decache)
    global.reflow.teardown()
    console.log(tree.name)
    const stdoutText = stdoutCapture.stdout.join("");
    console.log(stdoutText)
    done(failures)
  })
}




module.exports = executeTree
