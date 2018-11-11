require('babel-register')();
const MochaReflow = require('./mocha-reflow').default;
const decache = require('decache');
const praseDir = require('./utils/parse-dir');

const FlakeId = require('flakeid');

const path = require('path');

let vmRunner;
let mochaReflowInstance;

const typesToPush = ["suite", "hook"];

const pushToMocha = ({ path }) => {
  mochaReflowInstance.files.push(path);
};

const executeSubTree = function(combination) {
  const suites = [].concat(combination.suites);
  suites.forEach(executeSuites);
}

const executeSuites = function(branch) {
  if(typesToPush.includes(branch.type)) {
    return pushToMocha(branch);
  }

  return executeSubTree(branch);
}

const executeTree = function({combination, customActions, mochaConfig, flowDetails, DAG, jobDetails, capability, connection}, done) {

  const {
    require: mochaRequiredFiles,
    reporterOptions,
    ...mochaRestConfigs
  } = mochaConfig


  mochaRequiredFiles.forEach(mod => {
    require(mod);
  })

  const combinationID = new FlakeId({}).gen();
  const mochaReflowConfig = Object.assign({
    ui: 'reflow-bdd',
    reporter: 'reflow-reporter',
    reporterOptions: {
      ...(reporterOptions||{}),
      batch: true,
      combinationID,
      flowDetails: {
        ...(reporterOptions.flowDetails||{}),
        ...flowDetails,
        DAG,
      },
      jobDetails: {
        ...(reporterOptions.jobDetails||{}),
        ...jobDetails,
      },
    },
  }, mochaRestConfigs);

  mochaReflowInstance = new MochaReflow(mochaReflowConfig);


  const suites = [].concat(combination.suites);

  suites.forEach(executeSuites);
  console.log('customActions path', customActions)

  const customActionsObj = praseDir(customActions);
  console.log('customActionsObj', customActionsObj)

  const {remoteOptions, ...clientConfig} = capability;
  mochaReflowInstance.initClient(remoteOptions, clientConfig).then(client => {
    global.client = client;

    mochaReflowInstance.run(failures => {
      mochaReflowInstance.files.forEach(decache);
      client.teardown().then(_ => {
        setTimeout(() => done(failures), 1000)
      });
    })
  })

}




module.exports = executeTree
