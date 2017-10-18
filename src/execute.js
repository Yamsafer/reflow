import MochaRefow from './mocha-reflow';

import _ from 'lodash'

let allSuites;

const getSuiteDefinition = function(name) {
  return allSuites[name]
}
const setSuiteDefinitions = function(suites) {
  allSuites = suites;
}

const executeMochaHooks = function(detail) {
  detail.before && before(detail.before);
  detail.afterEach && afterEach(detail.afterEach);
  detail.beforeEach && beforeEach(detail.beforeEach);
  detail.after && after(detail.after);
}

let mochaReflowInstance;

const executeSuite = ({ name }) => {
  // const suiteDescriptor = allSuites[name];
  const suitePath = getSuiteDefinition(name)
  // console.log('suitePath::', suitePath)
  if (!suitePath)
    throw new Error(`no suites specified in flow "${name}".`);

  // if(name === "NOOP") {
  //   return suiteDescriptor();
  // }
  return mochaReflowInstance.addFile(suitePath);
  // describe(name, suiteDescriptor);
};


const mochaConfig = {
  reporter: function() {

  }
}

const executeTree = function(tree) {
  if(tree.type === "fork") {
    mochaReflowInstance = new MochaRefow(tree, mochaConfig)
  }

  const treeName = tree.name;

  const suites = _.isArray(tree.suites)? tree.suites : [tree.suites];

  // suites.forEach(branch => {
  //   const suitePath = getSuiteDefinition(treeName)
  //   mochaReflowInstance.addFile(suitePath);
  // })
  suites.forEach(executeSuites);
  // console.log('mochaReflowInstance:', mochaReflowInstance)
  return new Promise((resolve, reject) => {
    mochaReflowInstance.run(function(failures) {
      if(failures) return reject(failures);
      return resolve();
    })
  })
  // describe(treeName, function() {
  //   executeMochaHooks(tree)
  //   suites.forEach(executeSuites);
  // })
}

const executeSuites = function(branch) {
  if(branch.type === "suite") {
    // console.log('branch::', branch)
    return executeSuite(branch);
  }

  return executeTree(branch);
}

const executeMatrix = function(matrix, config) {
  const {
    testRunner,
    suites,
    forkHooks,
    detail,
    name,
  } = config;

  global.describe = testRunner;
  setSuiteDefinitions(suites);

  const totalForks = matrix.length;
  const normalizedMatrix = matrix.map((tree, i) => ({
    name: `${name}: fork #${i+1}/${totalForks}`,
    ...detail,
    suites: tree,
    type: "fork",
  }))
  
  describe(`${name}: (${totalForks} total flows)`, function() {
    executeMochaHooks(forkHooks);
    normalizedMatrix.forEach(executeTree);
  })
}

export default executeMatrix
export {
  setSuiteDefinitions,
  getSuiteDefinition,
  executeTree,
}