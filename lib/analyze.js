import _ from 'lodash';
const scalars = ["suite", "hook"];
const ARROW = ' -> ';

const resolveScalar = function(branch) {
  return branch.name
}

const resolveVector = function(tree) {
  const suites = [].concat(tree.suites);
  return `( ${tree.name}: ${suites.map(resolveTypes).join(ARROW)} )`;
}

const resolveTypes = function(branch) {
  if(scalars.includes(branch.type)) {
    return resolveScalar(branch);
  }

  return resolveVector(branch);
}


const analyzeMatrix = function(matrixName, combinations) {
  const analysisTree = [];

  const analyticsMap = combinations.map(combination => {
    return combination.map(resolveTypes).join(ARROW)
  });

  analysisTree.push(`${matrixName}: (${analyticsMap.length} combinations)`);
  
  analyticsMap.forEach(combination => {
    analysisTree.push(` | ${combination}`);
  });

  return analysisTree
};

export default analyzeMatrix

