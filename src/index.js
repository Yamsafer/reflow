'use strict'
import _ from 'lodash';
import { evaluateFlow, evaluateSubflow } from './evaluate';
import analyzeTree from './analyze';

let initialRun = true;
const defaultConfig = {
  watchMode: false,
  analyzeMode: false,
};

const userConfig = {};
const subflows = {};

const reflow = function(name, configCb) {
  if(initialRun) return;
  const result = evaluateFlow(name, configCb);
  if(userConfig.analyzeMode) {
    const analysisTree = analyzeTree(name, result);
    console.log(analysisTree.join('\n'))
  }
  return result;
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
  }
})


export default reflow