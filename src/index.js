import _ from 'lodash';
import { evaluateFlow, evaluateSubflow } from './evaluate';
import analyzeMatrix from './analyze';
import executeMatrix from './execute'
import reflowProps from './props'

let initialRun = true;

const defaultConfig = {
  watchMode: false,
  analyzeMode: false,
  executeFlows: false,
};

const userConfig = {};
const suitePaths = {};
const subflows = {};
const registeredSuites = {};

const registerSuitePath = function(name, path) {
  console.log(`Suite "${name}" registered.`);
  registeredSuites[name] = path;
}




const reflow = function(name, getDetail) {
  if(initialRun) return;
  const {
    suites,
    ...rest,
  } = getDetail() || {};

  const executionMatrix = evaluateFlow(name, suites);
  
  if(userConfig.analyzeMode) {
    const analysisTree = analyzeMatrix(name, executionMatrix);
    console.log(analysisTree.join('\n'))
  }

  if(userConfig.executeFlows) {
    const config = {
      name,
    }
    executeMatrix(executionMatrix, config);
  }

  return executionMatrix;
}


Object.assign(reflow, {
  init(config) {
    if (config.watchMode) console.log('Running in watch mode.');
    if (config.analyzeMode) console.log('Running in Analyze mode.');

    return Object.assign(userConfig, defaultConfig, config);
  },
  completeInitialRun() {
    if(userConfig.watchMode && initialRun) {
      console.log("Edit or Save a flow to run it")
    }
    initialRun = false;
  },
  analyzeMatrix,
  getSuite(name) {
    const suitePath = registeredSuites[name];
    if(!suitePath) throw new Error(`Unable to find suite ${name}.`)
    return {
      name,
      path: suitePath,
      type: 'suite',
    };
  },
  fork(suites) {
    return suites
  },
  getSubflow(name) {
    const subflowDetail = subflows[name];
    if(!subflowDetail) throw new Error(`Unable to get subflow "${name}".`);

    return evaluateSubflow(name , subflowDetail)
  },
  subflow(name, configCb) {
    console.log(`Registering "${name}" Subflow.`);
    subflows[name] = configCb
  },
  getSubflows() {
    return subflows;
  },
  registerSuitePath,
  ...reflowProps,
})


export default reflow