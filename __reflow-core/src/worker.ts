import {Mocha} from './mocha-reflow';
import * as FlakeId from 'flake-idgen'
import decache from 'decache'
import praseDir from './utils/parse-dir'

let vmRunner;
let mochaReflowInstance:Mocha;

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

  const combinationID = new FlakeId().next();
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

  mochaReflowInstance = new Mocha(mochaReflowConfig);


  const suites = [].concat(combination.suites);

  suites.forEach(executeSuites);
  console.log('customActions path', customActions)

  const customActionsObj = praseDir(customActions);
  console.log('customActionsObj', customActionsObj)


  mochaReflowInstance.initClient({connection, capability, customActions}).then(client => {
    global.client = client;

    mochaReflowInstance.run(failures => {
      mochaReflowInstance.files.forEach(decache);
      // global.reflow.teardown();
      // DONT FORGET TEARDOWN
      client.teardown().then(() => {
        setTimeout(() => done(failures), 1000)
      });
    })
  })

}




module.exports = executeTree
