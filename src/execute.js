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

  if(name === "NOOP") {
    return suiteDescriptor();
  }
  
  describe(name, suiteDescriptor);
};

const executeTree = function(tree) {
  const treeName = tree.name;
  const suites = _.isArray(tree.suites)? tree.suites : [tree.suites];

  describe(treeName, function() {
    executeMochaHooks(tree)
    suites.forEach(executeSuites);
  })
}

const executeSuites = function(branch) {
  if(branch.type === "suite") {
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
  allSuites = suites;

  const normalizedMatrix = matrix.map((tree, i) => ({
    name: `${name}: fork #${i+1}`,
    ...detail,
    suites: tree,
    type: "fork",
  }))
  
  describe(name, function() {
    executeMochaHooks(forkHooks);
    normalizedMatrix.forEach(executeTree);
  })
}

export default executeMatrix
