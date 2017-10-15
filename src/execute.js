import _ from 'lodash'

let allSuites;

const executeMochaHooks = function(detail) {
  detail.before && before(detail.before);
  detail.afterEach && afterEach(detail.afterEach);
  detail.beforeEach && beforeEach(detail.beforeEach);
  detail.after && after(detail.after);
}


const executeSuite = ({ name }) => {
  const suiteDescriptor = allSuites[name];
  
  if (!suiteDescriptor)
    throw new Error(`no suites specified in flow "${name}".`);
  
  suiteDescriptor();
};

const executeTree = function(tree) {
  const treeName = tree.name;
  const suites = _.isArray(tree.suites)? tree.suites : [tree.suites];

  describe(treeName, function() {
    executeMochaHooks(tree)
    suites.forEach(executeSuites);
  })
}

const executeSuites = function executeSuites(branch) {
  if(branch.type === "suite") {
    return executeSuite(branch);
  }

  return executeTree(branch);
}

const executeMatrix = function(matrix, config) {
  const {
    testRunner,
    suites,
    detail,
  } = config;

  global.describe = testRunner;
  allSuites = suites;
  
  describe(name, function() {
    executeMochaHooks(detail);
    matrix.forEach(executeTree);
  })
}

export default executeMatrix
