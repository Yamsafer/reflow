'use strict'
import _ from 'lodash';
import { evaluateFlow, evaluateSubflow } from './evaluate';
import analyzeMatrix from './analyze';
import executeMatrix from './execute'
import reflowProps from './props'

let initialRun = true;
let mochaDescribe;

const defaultConfig = {
  watchMode: false,
  analyzeMode: false,
  executeFlows: false,
};

const userConfig = {};
const subflows = {};
const registeredSuites = {};

const registerSuiteDescription = function(name, descriptor) {
  console.log(`Suite "${name}" registered.`);
  registeredSuites[name] = descriptor;
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
      suites: registeredSuites,
      testRunner: userConfig.testRunner,
      detail: rest,
    }
    executeMatrix(executionMatrix, config);
  }

  return executionMatrix;
}


Object.assign(reflow, {
  init(config) {
    if (config.watchMode) console.log('Running in watch mode.');
    if (config.analyzeMode) console.log('Running in Analyze mode.');


    mochaDescribe = describe;

    global.describe = registerSuiteDescription
    global.describe.only = mochaDescribe.only

    return Object.assign(userConfig, defaultConfig, config);
  },
  completeInitialRun() {
    if(userConfig.watchMode && initialRun) {
      console.log("Edit or Save a flow to run it")
    }
    initialRun = false;
  },
  analyzeTree,
  getSuite(name) {
    return {
      name,
      type: 'suite',
    };
  },
  fork(suites) {
    return suites
    return {
      type: 'fork',
      suites,
    }
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
  ...reflowProps,
})


export default reflow