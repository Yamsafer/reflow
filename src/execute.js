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


// /*
//       BEFORE!
//  */



// const executeSuite = suites => branch => {
//   const branchName = branch.name;

//   const suiteDescription = suites[branchName];

//   if(!suiteDescription) throw new Error(`no suites specified in flow "${branchName}".`);

//   describe(branchName, function() {
//     executeMochaHooks(branch);
//     suiteDescription();
//   });
// }
// const executeTree = function(matrixName, executionTree, suites, detail) {
//   describe(matrixName, function() {
//     executeMochaHooks(detail)

//     executionTree.forEach(branch => {
//       const branchType = branch.type;
//       if(branchType === "suite") {
//         return executeSuite(suites)(branch);
//       }
      
//       const branchName = branch.name;
      
//       describe(branchName, function() {
//         executeMochaHooks(branch);
//         branch.suites.forEach(subBranch => {
//           if(subBranch.type === "suite") {
//             const suiteDescription = suites[branchName];
//             suiteDescription();
//           }
//           subBranch.suites.forEach(subsubBranch => {

//           })
//         })
//         suiteDescription();
//       });
      
//     })

//   });

// }
// const executeMatrix = function(matrixName, executionMatrix, config) {
//   const {
//     mochaDescribe,
//     suites,
//     detail,
//   } = config;
//   global.describe = mochaDescribe;

//   executionMatrix.forEach(executionTree => {
//     executeTree(matrixName, executionTree, suites, detail);
//   })
// }

// export {
//   executeTree,
// }
// export default executeMatrix;

// cartesianCombinations.forEach(suites => {
//   mochaDescribe(name, function() {
//     config.before && before(config.before);
//     config.afterEach && afterEach(config.afterEach);
//     config.beforeEach && beforeEach(config.beforeEach);
//     after(function() {
//       flowTeardown()
//       config.after && config.after();
//     });
//     if(!suites) throw new Error(`no suites specified in flow "${name}".`);
//     suites.forEach(suite => {
//       if(typeof suite === "object") {
//         const config = suite;
//         if(config.condition && config.condition(suites) !== true) {
//           return;
//         }
//         // i have to do cartesian for subflow conditionals.

//         if(!config.suites.length) {
//           config.suites.push('NOOP')
//         }

//         mochaDescribe(config.name, function() {
//           config.afterEach && afterEach(config.afterEach);
//           config.beforeEach && beforeEach(config.beforeEach);
//           config.before && before(config.before);
//           config.after && after(config.after);
//           config.suites.forEach(subflowSuite => {
//             if(typeof subflowSuite === "object") {
//               subflowSuite.forEach(subsubflowSuite => {
//                 const suiteData = mochaSuites[subsubflowSuite];
//                 describe(subflowSuite, suiteData.suite);
//               })
//               return;
//             }
//             const subflowSuiteData = mochaSuites[subflowSuite];
//             console.log('subflowSuite::', subflowSuite)

//             describe(subflowSuite, subflowSuiteData.suite);
//           });
//         });
//         return;
//       }
//       const suiteData = mochaSuites[suite];
//       describe(suite, suiteData.suite);
//     })
//   })
// })