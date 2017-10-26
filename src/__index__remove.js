import { evaluateFlow, evaluateSubflow } from './evaluate';
import analyzeMatrix from './analyze';
import executeMatrix from './execute'
import reflowProps from './props'

const defaultConfig = {
  watchMode: false,
  analyzeMode: false,
};

const userConfig = {};
const suitePaths = {};
const subflows = {};
const registeredSuites = {};


const reflow = function(name, getDetail) {

  const {
    suites,
    ...rest,
  } = getDetail() || {};

  console.log('evaluating flow')
  const executionMatrix = evaluateFlow(name, suites);
  
  if(userConfig.analyzeMode) {
    const analysisTree = analyzeMatrix(name, executionMatrix);
    console.log(analysisTree.join('\n'))
    return analysisTree;
  }

  
  const config = {
    name,
    ...rest,
  }
  console.log('executing matrix')
  executeMatrix(executionMatrix, config);


  return executionMatrix;
}


Object.assign(reflow, {
  init(config) {
    if (config.watchMode) console.log('Running in watch mode.');
    if (config.analyzeMode) console.log('Running in Analyze mode.');

    return Object.assign(userConfig, defaultConfig, config);
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
  registerSuitePath(name, path) {
    console.log(`Suite "${name}" registered.`);
    registeredSuites[name] = path;
  },
  ...reflowProps,
})


export default reflow